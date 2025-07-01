import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-secret';

// ▶️ Registro de novo usuário
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica se já existe um usuário com o mesmo e-mail
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

    // Busca o usuário e garante que o campo senha seja retornado
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a salva
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gera token JWT
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
