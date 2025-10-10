import prisma from '../db.js';

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, phoneNumber: true, address: true, role: true } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error fetching profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, address } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (phoneNumber !== undefined) data.phoneNumber = String(phoneNumber);
    if (address !== undefined) data.address = address;
    const user = await prisma.user.update({ where: { id }, data, select: { id: true, name: true, email: true, phoneNumber: true, address: true, role: true } });
    return res.json({ message: 'Profile updated', user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error updating profile' });
  }
};


