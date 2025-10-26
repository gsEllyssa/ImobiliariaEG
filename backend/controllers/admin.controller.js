// backend/controllers/admin.controller.js

import User from '../models/user.model.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // <-- ADICIONE ESTA LINHA

// --- CORREÇÃO DO CAMINHO ---
// Resolve o caminho a partir da localização deste arquivo (__dirname)
// Sobe dois níveis (de /backend/controllers para a raiz /imobiliaria) 
// e então acessa a pasta node_modules correta.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const disposableDomainsPath = path.resolve(__dirname, '../../node_modules/disposable-email-domains/index.json');
const disposableDomains = JSON.parse(fs.readFileSync(disposableDomainsPath, 'utf-8'));


// --- SCHEMA DE VALIDAÇÃO (ZOD) ---
const inviteUserSchema = z.object({
  name: z.string().min(2, { message: 'O nome é obrigatório e deve ter no mínimo 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, forneça um e-mail válido.' }),
  role: z.enum(['admin', 'corretor'], { errorMap: () => ({ message: "A função deve ser 'admin' ou 'corretor'." }) }),
});


// --- FUNÇÃO AUXILIAR (SIMULAÇÃO DE ENVIO DE E-MAIL DE CONVITE) ---
const sendInvitationEmail = async (email, token) => {
  const invitationLink = `http://localhost:5173/ativar-conta?token=${token}`;

  console.log('-------------------------------------------');
  console.log(`📧 E-MAIL DE CONVITE (Simulação):`);
  console.log(`   Para: ${email}`);
  console.log(`   Link de Ativação: ${invitationLink}`);
  console.log('-------------------------------------------');
};


// --- CONTROLLER PARA CONVIDAR UM NOVO USUÁRIO ---
export const inviteUser = async (req, res) => {
  try {
    const validatedData = inviteUserSchema.parse(req.body);
    const { name, email, role } = validatedData;

    const domain = email.split('@')[1];
    if (disposableDomains.includes(domain)) {
      return res.status(400).json({ message: 'Não é permitido o uso de e-mails temporários ou descartáveis.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Um usuário com este e-mail já existe.' });
    }

    const newUser = new User({ name, email, role });
    const activationToken = newUser.createActivationToken();
    await newUser.save();
    await sendInvitationEmail(newUser.email, activationToken);

    res.status(201).json({ message: `Convite enviado com sucesso para ${email}!` });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.flatten().fieldErrors });
    }
    console.error('Erro ao convidar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor.', error: error.message });
  }
};