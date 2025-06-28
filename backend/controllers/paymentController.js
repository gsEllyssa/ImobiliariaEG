import Payment from "../models/Payment.js";
import Contract from "../models/Contract.js";

export const listarPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("tenantId")
      .populate("contractId");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos." });
  }
};

export const criarPayment = async (req, res) => {
  try {
    const { tenantId, contractId, amount, method } = req.body;

    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ error: "Contrato não encontrado." });
    }

    const payment = new Payment({
      tenantId,
      contractId,
      amount,
      method,
      date: new Date(),
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar pagamento." });
  }
};
