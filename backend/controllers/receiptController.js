import Receipt from '../models/Recibo.js';

export const getAllReceipts = async (req, res) => {
  const receipts = await Receipt.find().populate('pagamentoId');
  res.json(receipts);
};

export const createReceipt = async (req, res) => {
  const receipt = new Receipt(req.body);
  await receipt.save();
  res.status(201).json(receipt);
};
