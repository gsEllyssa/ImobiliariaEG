import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Login user
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!JWT_SECRET) {
      return res.status(500).json({ error: 'Chave secreta do JWT não configurada.' });
    }

    const user = await User.findOne({ email });
    
    // Corrigido para 'user.senha' conforme nosso model
    if (!user || !(await bcrypt.compare(password, user.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      name: user.nome, // Corrigido para 'user.nome' conforme nosso model
      role: user.role
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro durante o login.' });
  }
}