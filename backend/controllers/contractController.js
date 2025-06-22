import Contract from '../models/Contrato.js';

export const getAllContracts = async (req, res) => {
  const contracts = await Contract.find().populate('tenantId propertyId');
  res.json(contracts);
};

export const createContract = async (req, res) => {
  const contract = new Contract(req.body);
  await contract.save();
  res.status(201).json(contract);
};
