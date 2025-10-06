import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Schema de validação com Zod para o registro
const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

// Schema de validação com Zod para o login
const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

// -----------------------------------------------------------------------------
// Controller para registrar um novo usuário
// -----------------------------------------------------------------------------
export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }

    const newUser = new User(validatedData);
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.flatten().fieldErrors });
    }
    res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

// -----------------------------------------------------------------------------
// Controller para login de usuário
// -----------------------------------------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    if (!process.env.JWT_SECRET) {
      throw new Error('Chave secreta do JWT não configurada no servidor.');
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.flatten().fieldErrors });
    }
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno durante o login.' });
  }
};