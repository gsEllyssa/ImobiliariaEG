import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função de login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validação dos dados de entrada
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    // 2. Busca o usuário no BANCO DE DADOS
    const user = await User.findOne({ email });

    // 3. Compara a senha enviada com a senha criptografada do banco
    //    Usamos 'user.senha' porque foi o nome que definimos no nosso user.model.js
    if (!user || !(await bcrypt.compare(password, user.senha))) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // 4. Gera o Token JWT usando a chave secreta do .env
    const token = jwt.sign(
      { id: user._id, name: user.nome, role: user.role },
      process.env.JWT_SECRET, // Pega a chave segura do .env
      { expiresIn: '8h' }
    );

    // 5. Envia a resposta com o token e os dados do usuário
    res.json({
      token,
      user: {
        name: user.nome,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('❌ Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro interno ao processar o login.' });
  }
};

// Se precisar da função de registro aqui também, pode adicioná-la
// export const register = async (req, res) => { ... };