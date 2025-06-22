import Payment from '../models/Pagamento.js';
import Contract from '../models/Contrato.js';

export const listarPagamentos = async (req, res) => {
  try {
    const payments = await Payment.find().populate('tenantId contractId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pagamentos.' });
  }
};

export const criarPagamento = async (req, res) => {
  try {
    const { tenantId, contractId, amount, method } = req.body;

    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }

    const payment = new Payment({
      tenantId,
      contractId,
      amount,
      method,
      date: new Date()
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pagamento.' });
  }
};
