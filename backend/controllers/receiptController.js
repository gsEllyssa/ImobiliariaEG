import Receipt from '../models/Recibo.js';

export const listarRecibos = async (req, res) => {
  try {
    const receipts = await Receipt.find().populate('paymentId');
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar recibos.' });
  }
};

export const criarRecibo = async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    await receipt.save();
    res.status(201).json(receipt);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar recibo.' });
  }
};
