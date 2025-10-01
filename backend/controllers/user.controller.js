import User from '../models/user.model.js'; // Correção 1: Nome do arquivo padronizado
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// A chave secreta DEVE vir do seu arquivo .env
const JWT_SECRET = process.env.JWT_SECRET;

// Register new user
export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Garante que a JWT_SECRET foi carregada
    if (!JWT_SECRET) {
      return res.status(500).json({ error: 'Chave secreta do JWT não foi configurada.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }
    
    // Correção 2: Não criptografe a senha aqui! O model já faz isso automaticamente.
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro durante o registro.' });
  }
}

// Login user
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Garante que a JWT_SECRET foi carregada
    if (!JWT_SECRET) {
      return res.status(500).json({ error: 'Chave secreta do JWT não foi configurada.' });
    }

    const user = await User.findOne({ email });
    
    // Correção 3: Use bcrypt.compare para comparar as senhas
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro durante o login.' });
  }
}