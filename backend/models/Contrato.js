import mongoose from 'mongoose';

const contratoSchema = new mongoose.Schema({
  inquilino: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino', required: true },
  imovel: { type: mongoose.Schema.Types.ObjectId, ref: 'Imovel', required: true },
  tipo: { type: String, enum: ['aluguel', 'compra', 'venda'], required: true },
  status: { type: String, enum: ['ativo', 'encerrado', 'pendente'], default: 'ativo' },
  dataInicio: { type: Date, required: true },
  dataFim: { type: Date },
  valor: { type: Number, required: true }
});

export default mongoose.model('Contrato', contratoSchema);
