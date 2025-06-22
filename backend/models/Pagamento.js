import mongoose from 'mongoose';

const PagamentoSchema = new mongoose.Schema({
  contratoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrato' },
  inquilinoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino' },
  valor: Number,
  dataPagamento: Date,
  metodo: { type: String, enum: ['Pix', 'Cartão', 'Dinheiro'] },
  status: { type: String, enum: ['Pendente', 'Pago'], default: 'Pendente' }
}, { timestamps: true });

export default mongoose.model('Pagamento', PagamentoSchema);
