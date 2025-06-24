import mongoose from 'mongoose';

const ContratoSchema = new mongoose.Schema({
  amount: Number,
  dataInicio: Date,
  dataFim: Date,
  vencimento: Date,
  imovel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imovel',
  }
}, { timestamps: true });

export default mongoose.model('Contrato', ContratoSchema);
