import Payment from '../models/Payment.js';

export const getAllPayments = async (req, res) => {
  const payments = await Payment.find().populate('contratoId');
  res.json(payments);
};

export const createPayment = async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).json(payment);
};
