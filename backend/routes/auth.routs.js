import express from 'express';
import { authController } from '../controllers/index.js';

const router = express.Router();

// Authentication routes
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

export default router;
