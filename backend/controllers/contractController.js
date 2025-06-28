// backend/controllers/contractController.js
import Contract from '../models/Contract.js';

export const listarContratos = async (req, res) => {
  try {
    const contracts = await Contract.find().populate("tenantId propertyId");
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contratos." });
  }
};

export const criarContrato = async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar contrato." });
  }
};

export const buscarContratoPorId = async (req, res) => {
  try {
    const contrato = await Contract.findById(req.params.id).populate("tenantId propertyId");
    if (!contrato) return res.status(404).json({ error: 'Contrato não encontrado' });
    res.json(contrato);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contrato." });
  }
};

export const atualizarContrato = async (req, res) => {
  try {
    const contratoAtualizado = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contratoAtualizado) return res.status(404).json({ error: 'Contrato não encontrado' });
    res.json(contratoAtualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar contrato." });
  }
};
