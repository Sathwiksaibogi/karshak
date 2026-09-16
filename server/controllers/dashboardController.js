import prisma from '../db.js';

function groupByMonth(orders, mapItemTotal) {
  const byMonth = new Map();
  for (const o of orders) {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const amount = mapItemTotal(o);
    byMonth.set(key, (byMonth.get(key) || 0) + amount);
  }
  return Array.from(byMonth.entries())
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export const getFarmerDashboard = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const orders = await prisma.order.findMany({
      where: { items: { some: { product: { farmerId } } } },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const totalRevenue = orders.reduce((acc, o) => {
      const contribution = o.items.reduce((s, it) => s + (it.product.farmerId === farmerId ? it.price * it.quantity : 0), 0);
      return acc + contribution;
    }, 0);
    const totalOrders = orders.length;
    const monthly = groupByMonth(orders, (o) => o.items.reduce((s, it) => s + (it.product.farmerId === farmerId ? it.price * it.quantity : 0), 0));

    return res.json({ totalRevenue, totalOrders, monthly });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error fetching farmer dashboard' });
  }
};

export const getBuyerDashboard = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const orders = await prisma.order.findMany({
      where: { buyerId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    const totalSpent = orders.reduce((acc, o) => acc + o.items.reduce((s, it) => s + it.price * it.quantity, 0), 0);
    const totalOrders = orders.length;
    const monthly = groupByMonth(orders, (o) => o.items.reduce((s, it) => s + it.price * it.quantity, 0));
    return res.json({ totalSpent, totalOrders, monthly });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error fetching buyer dashboard' });
  }
};


