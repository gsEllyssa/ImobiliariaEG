import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-secret';

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const newUser = new User({
      name,
      email,
      password,
      role
    });

    await newUser.save();

    res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error registering user.' });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    console.log('📥 Login request received:', req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.warn('⚠️ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.warn('⚠️ Incorrect password for email:', email);
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '3h' }
    );

    console.log('✅ Login successful! Token generated:', token);

    res.json({
      message: '✅ Login successful!',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Error logging in.' });
  }
};
