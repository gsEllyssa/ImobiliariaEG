import mongoose from 'mongoose';

const PagamentoSchema = new mongoose.Schema({
  contratoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrato' },
  inquilinoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino' },
  valor: Number,
  dataPagamento: { type: Date, default: Date.now },
  status: { type: String, enum: ['pendente', 'pago'], default: 'pendente' },
  mesReferencia: String, // Exemplo: "06/2025"
});

export default mongoose.model('Pagamento', PagamentoSchema);
