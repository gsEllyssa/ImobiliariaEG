import mongoose from 'mongoose';

const reciboSchema = new mongoose.Schema({
  pagamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Pagamento', required: true },
  contrato: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrato', required: true },
  inquilino: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino', required: true },
  dataEmissao: { type: Date, default: Date.now }
});

export default mongoose.model('Recibo', reciboSchema);
