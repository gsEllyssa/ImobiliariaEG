import Contract from '../models/Contrato.js';

export const listarContratos = async (req, res) => {
  try {
    const contracts = await Contract.find().populate('tenantId propertyId');
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
};

export const criarContrato = async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar contrato.' });
  }
};
