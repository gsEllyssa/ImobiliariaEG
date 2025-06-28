// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

// Registro de novo usuário
export const registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    const novoUsuario = new Usuario({
      name: nome,
      email,
      password: senha, // agora está correto com o model
      role
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: '✅ Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ erro: 'Erro ao registrar usuário.' });
  }
};

// Login
export const loginUsuario = async (req, res) => {
  try {
    console.log('📥 Requisição recebida no login:', req.body);

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.warn('⚠️ Usuário não encontrado:', email);
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const senhaValida = await usuario.comparePassword(senha);
    if (!senhaValida) {
      console.warn('⚠️ Senha incorreta para o e-mail:', email);
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '3h' }
    );

    console.log('✅ Login bem-sucedido! Token gerado:', token);

    res.json({
      mensagem: '✅ Login realizado com sucesso!',
      token,
      usuario: {
        nome: usuario.name,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
};
