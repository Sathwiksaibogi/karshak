import prisma from '../db.js';

export const createMachinery = async (req, res) => {
  try {
    const { name, description, price, pricingType, farmerId, imageUrl, quantity } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Machinery name is required' });
    }
    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }
    const numericQuantity = Number(quantity) || 1;
    if (Number.isNaN(numericQuantity) || numericQuantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }
    if (!farmerId || typeof farmerId !== 'string') {
      return res.status(400).json({ message: 'farmerId is required' });
    }
    if (!pricingType || !['hourly', 'daily', 'halfday'].includes(pricingType)) {
      return res.status(400).json({ message: 'pricingType must be hourly, daily, or halfday' });
    }

    // Ensure farmer exists
    const farmer = await prisma.user.findUnique({ where: { id: farmerId } });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const machinery = await prisma.machinery.create({
      data: {
        name,
        description: description || '',
        price: numericPrice,
        pricingType,
        quantity: numericQuantity,
        farmerId,
        imageUrl,
      },
    });

    return res.status(201).json({ message: 'Machinery created', machinery });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error creating machinery' });
  }
};

export const getMachineryByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const machinery = await prisma.machinery.findMany({ 
      where: { farmerId },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ machinery });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching machinery' });
  }
};

export const getAllMachinery = async (req, res) => {
  try {
    const machinery = await prisma.machinery.findMany({
      where: { isAvailable: true },
      include: { farmer: { select: { id: true, name: true, phoneNumber: true, address: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ machinery });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching machinery' });
  }
};

export const getMachineryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Machinery id is required' });
    }

    const machinery = await prisma.machinery.findUnique({
      where: { id },
      include: {
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

    if (!machinery) {
      return res.status(404).json({ message: 'Machinery not found' });
    }

    return res.json({ machinery });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching machinery' });
  }
};

export const updateMachinery = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, pricingType, imageUrl, isAvailable, quantity } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = Number(price);
    if (pricingType !== undefined) data.pricingType = pricingType;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (isAvailable !== undefined) data.isAvailable = Boolean(isAvailable);
    if (quantity !== undefined) data.quantity = Number(quantity);

    const updated = await prisma.machinery.update({ where: { id }, data });
    return res.json({ message: 'Machinery updated', machinery: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error updating machinery' });
  }
};
