import prisma from '../db.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category = 'General', stock, farmerId, imageUrl } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Product name is required' });
    }
    const numericPrice = Number(price);
    const numericStock = Number(stock);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }
    if (Number.isNaN(numericStock) || numericStock < 0) {
      return res.status(400).json({ message: 'Invalid stock/quantity' });
    }
    if (!farmerId || typeof farmerId !== 'string') {
      return res.status(400).json({ message: 'farmerId is required' });
    }

    // Ensure farmer exists
    const farmer = await prisma.user.findUnique({ where: { id: farmerId } });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || '',
        price: numericPrice,
        category,
        stock: numericStock,
        farmerId,
        imageUrl,
      },
    });

    return res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error creating product' });
  }
};

export const getProductsByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const products = await prisma.product.findMany({ where: { farmerId } });
    return res.json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching products' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = Number(price);
    if (category !== undefined) data.category = category;
    if (stock !== undefined) data.stock = Number(stock);
    if (imageUrl !== undefined) data.imageUrl = imageUrl;

    const updated = await prisma.product.update({ where: { id }, data });
    return res.json({ message: 'Product updated', product: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error updating product' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Normalize to match stored categories (case-insensitive match)
    const products = await prisma.product.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive',
        },
        stock: { gt: 0 },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        stock: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching products by category' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Product id is required' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        imageUrl: true,
        stock: true,
        createdAt: true,
        farmer: {
          select: {
            id: true,
            name: true,
            phoneNumber: true,
            address: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching product' });
  }
};

export const listProductNames = async (_req, res) => {
  try {
    const rows = await prisma.product.findMany({
      select: { name: true },
      distinct: ['name'],
      orderBy: { name: 'asc' },
    });
    const names = rows.map((r) => r.name).filter(Boolean);
    return res.json({ names });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching product names' });
  }
};