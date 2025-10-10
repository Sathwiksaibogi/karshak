import prisma from '../db.js';

export const createOrder = async (req, res) => {
  try {
    const { buyerId, productId, machineryId, quantity, paymentMethod, taxPct = 0, discountPct = 0, startDate, endDate, duration, pricingType } = req.body;
    
    if (!buyerId || !quantity) {
      return res.status(400).json({ message: 'buyerId and quantity are required' });
    }

    if (!productId && !machineryId) {
      return res.status(400).json({ message: 'Either productId or machineryId is required' });
    }

    let unitPrice, itemType, itemId;
    
    if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (product.stock < Number(quantity)) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      unitPrice = product.price;
      itemType = 'product';
      itemId = productId;
    } else {
      const machinery = await prisma.machinery.findUnique({ where: { id: machineryId } });
      if (!machinery) return res.status(404).json({ message: 'Machinery not found' });
      if (!machinery.isAvailable || machinery.quantity < Number(quantity)) {
        return res.status(400).json({ message: 'Machinery not available or insufficient quantity' });
      }
      unitPrice = machinery.price;
      itemType = 'rental';
      itemId = machineryId;
    }

    const baseQuantity = Number(quantity);
    const rentalMultiplier = itemType === 'rental' ? Number(duration || 1) : 1;
    const subTotal = unitPrice * baseQuantity * rentalMultiplier;
    const taxAmount = (taxPct / 100) * subTotal;
    const discountAmount = (discountPct / 100) * subTotal;
    const total = subTotal + taxAmount - discountAmount;

    // Create order and update availability/stock in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const orderData = {
        status: 'Pending',
        total,
        buyerId,
        items: {
          create: [
            {
              quantity: Number(quantity),
              price: unitPrice,
              type: itemType,
              productId: productId || null,
              machineryId: machineryId || null,
              startDate: startDate ? new Date(startDate) : null,
              endDate: endDate ? new Date(endDate) : null,
              duration: duration ? Number(duration) : null,
              pricingType: pricingType || null,
            },
          ],
        },
      };

      const createdOrder = await tx.order.create({
        data: orderData,
        include: { items: true },
      });

      if (productId) {
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: Number(quantity) } },
        });
      } else {
        await tx.machinery.update({
          where: { id: machineryId },
          data: { 
            quantity: { decrement: Number(quantity) }
          },
        });
      }

      return createdOrder;
    });

    return res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error creating order' });
  }
};

export const getFarmerOrders = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { items: { some: { product: { farmerId } } } },
          { items: { some: { machinery: { farmerId } } } }
        ],
      },
      include: {
        items: { 
          include: { 
            product: { include: { farmer: { select: { id: true, name: true, phoneNumber: true, address: true } } } },
            machinery: { include: { farmer: { select: { id: true, name: true, phoneNumber: true, address: true } } } }
          } 
        },
        buyer: { select: { id: true, name: true, address: true, phoneNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // e.g., 'In Progress' | 'Delivered'
    if (!status) return res.status(400).json({ message: 'status is required' });

    const order = await prisma.order.update({ where: { id: orderId }, data: { status } });
    return res.json({ message: 'Order updated', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error updating order' });
  }
};

export const deleteDeliveredOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'Delivered') {
      return res.status(400).json({ message: 'Only delivered orders can be deleted by farmer' });
    }
    await prisma.orderItem.deleteMany({ where: { orderId } });
    await prisma.order.delete({ where: { id: orderId } });
    return res.json({ message: 'Delivered order deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error deleting delivered order' });
  }
};

export const getBuyerOrders = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const orders = await prisma.order.findMany({
      where: { buyerId },
      include: { 
        items: { 
          include: { 
            product: { include: { farmer: { select: { id: true, name: true, phoneNumber: true, address: true } } } },
            machinery: { include: { farmer: { select: { id: true, name: true, phoneNumber: true, address: true } } } }
          } 
        } 
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching buyer orders' });
  }
};

export const deleteBuyerOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    // Delete order items first due to FK
    await prisma.orderItem.deleteMany({ where: { orderId } });
    await prisma.order.delete({ where: { id: orderId } });
    return res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error deleting order' });
  }
};


