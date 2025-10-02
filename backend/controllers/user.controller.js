import User from '../models/user.model.js';

// Função para criar um novo administrador
export async function createAdmin(req, res) {
  try {
    // Corrigido para 'nome' e 'senha' conforme nosso model
    const { nome, email, senha, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }
    
    // O model já criptografa a senha, então passamos a senha original
    const newUser = new User({ nome, email, senha, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro durante o registro.' });
  }
}