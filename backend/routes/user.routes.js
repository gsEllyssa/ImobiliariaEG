import express from 'express';
import bcrypt from 'bcrypt';
import { userController } from '../controllers/index.js';
import { proteger } from '../middlewares/auth.middleware.js';
import User from '../models/User.js';

const router = express.Router();

// Public authentication routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected route - User profile
router.get('/profile', proteger, (req, res) => {
  res.json({ message: 'Authenticated user profile', user: req.usuario });
});

// 🚨 TEMPORARY route to create the first admin user
router.post('/create-admin', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: 'admin@meusistema.com' });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash('senhaSuperSecreta123!', 10);

    const newAdmin = new User({
      name: 'Admin',
      email: 'admin@meusistema.com',
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    res.status(201).json({ message: '✅ Admin user created successfully!' });
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    res.status(500).json({ error: 'Error creating admin user' });
  }
});

export default router;
