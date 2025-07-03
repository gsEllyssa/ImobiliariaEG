import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-secret';

// ▶️ Registro de novo usuário
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já registrado.' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: '✅ Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

// ▶️ Login do usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '3h' }
    );

    res.status(200).json({
      message: '✅ Login realizado com sucesso!',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Erro no login:', error.message);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};

// ▶️ Acesso rápido (apenas para ambiente de desenvolvimento)
export const acessoRapido = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ error: 'Acesso rápido desativado em produção.' });
    }

    const user = await User.findOne({ email: 'admin@meusistema.com' });

    if (!user) {
      return res.status(404).json({ error: 'Usuário de acesso rápido não encontrado.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: '✅ Acesso rápido autorizado!',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Erro no acesso rápido:', error);
    res.status(500).json({ error: 'Erro ao realizar acesso rápido.' });
  }
};

// ✅ Exportação agrupada
export const authController = {
  registerUser,
  loginUser,
  acessoRapido,
};
