// backend/controllers/admin.controller.js

import User from '../models/user.model.js';
import { z } from 'zod';

// Schema de validação com Zod para o convite de usuário
const inviteUserSchema = z.object({
  name: z.string().min(2, { message: 'O nome é obrigatório e deve ter no mínimo 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, forneça um e-mail válido.' }),
  role: z.enum(['admin', 'corretor'], { errorMap: () => ({ message: "A função deve ser 'admin' ou 'corretor'." }) }),
});

// -----------------------------------------------------------------------------
// --- FUNÇÃO AUXILIAR (SIMULAÇÃO DE ENVIO DE E-MAIL) ---
// -----------------------------------------------------------------------------
// No futuro, você substituirá isso por um serviço real como Nodemailer ou SendGrid
const sendInvitationEmail = async (email, token) => {
  const invitationLink = `http://localhost:5173/ativar-conta?token=${token}`; // Use a URL do seu frontend

  console.log('-------------------------------------------');
  console.log(`📧 E-MAIL DE CONVITE (Simulação):`);
  console.log(`   Para: ${email}`);
  console.log(`   Link de Ativação: ${invitationLink}`);
  console.log('-------------------------------------------');
  // Aqui entraria a lógica real de envio de e-mail
};


// -----------------------------------------------------------------------------
// --- CONTROLLER PARA CONVIDAR UM NOVO USUÁRIO ---
// -----------------------------------------------------------------------------
export const inviteUser = async (req, res) => {
  try {
    // 1. Validar os dados recebidos com o schema Zod
    const validatedData = inviteUserSchema.parse(req.body);
    const { name, email, role } = validatedData;

    // 2. Verificar se já existe um usuário com este e-mail
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Um usuário com este e-mail já existe.' });
    }

    // 3. Criar uma nova instância do usuário (ainda sem salvar)
    const newUser = new User({
      name,
      email,
      role,
      // O status 'PENDENTE' e a senha nula são os padrões do nosso model
    });

    // 4. Usar o método do model para gerar o token de ativação
    const activationToken = newUser.createActivationToken();
    
    // 5. Salvar o novo usuário no banco de dados
    await newUser.save();

    // 6. Enviar o e-mail de convite com o token gerado
    await sendInvitationEmail(newUser.email, activationToken);

    res.status(201).json({ message: `Convite enviado com sucesso para ${email}!` });

  } catch (error) {
    // Tratamento de erro específico para o Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.flatten().fieldErrors });
    }
    // Tratamento para outros erros de servidor
    console.error('Erro ao convidar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor.', error: error.message });
  }
};