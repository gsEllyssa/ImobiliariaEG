// backend/utils/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Criar o "transportador" usando as credenciais do .env
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // 2. Definir as opções do e-mail (para quem, assunto, etc.)
  const mailOptions = {
    from: 'Imobiliária Lacerda <suporte@imobiliaria.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Enviar o e-mail
  await transporter.sendMail(mailOptions);
};

export default sendEmail;