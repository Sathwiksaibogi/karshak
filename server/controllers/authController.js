import prisma from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password, role, phoneNumber, address } = req.body;

  // Basic validation
  if (!name || !email || !password || !role || !phoneNumber) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Normalize and validate types
    const phone = String(phoneNumber || '').trim();
    if (!/^\d{7,15}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number (digits only, 7-15 length)' });
    }
    const normalizedEmail = (typeof email === 'string' && email.trim() !== '') ? email.trim() : null;
    const roles = (Array.isArray(role) ? role : [role])
      .map(r => typeof r === 'string' ? r.trim().toUpperCase() : '')
      .filter(Boolean);
    if (roles.length === 0) {
      return res.status(400).json({ message: 'Role is required' });
    }

    // Check if user already exists by phoneNumber (unique)
    const userExists = await prisma.user.findUnique({ where: { phoneNumber: phone } });
    if (userExists) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: roles,
        phoneNumber: phone,
        address,
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    // Handle Prisma unique constraint errors gracefully
    if (error?.code === 'P2002') {
      const fields = Array.isArray(error?.meta?.target) ? error.meta.target.join(', ') : 'unique field';
      return res.status(400).json({ message: `A user with this ${fields} already exists` });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
};


// @desc    Authenticate a user and get a token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  try {
    // Normalize phone number if provided
    let user = null;
    if (phoneNumber !== undefined && phoneNumber !== null && String(phoneNumber).trim() !== '') {
      const phone = String(phoneNumber).trim();
      user = await prisma.user.findUnique({ where: { phoneNumber: phone } });
    }
    // Fallback: try email if phone didn't resolve a user
    if (!user && email) {
      user = await prisma.user.findUnique({ where: { email } });
    }

    // If user exists and password matches, generate a token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, role: user.role }, // Payload
        process.env.JWT_SECRET,            // Secret
        { expiresIn: '1d' }                // Expiration
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } else {
      // Use a generic error message for security
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};