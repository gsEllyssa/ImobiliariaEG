import mongoose from 'mongoose';

const ReciboSchema = new mongoose.Schema({
  pagamentoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pagamento' },
  dataEmissao: { type: Date, default: Date.now },
  descricao: String,
}, { timestamps: true });

export default mongoose.model('Recibo', ReciboSchema);
