import mongoose from 'mongoose';

const ContratoSchema = new mongoose.Schema({
  inquilinoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino' },
  imovelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Imovel' },
  dataInicio: Date,
  dataFim: Date,
  valorMensal: Number,
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Contrato', ContratoSchema);
