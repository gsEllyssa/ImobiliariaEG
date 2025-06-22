import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema({
  contrato: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrato', required: true },
  inquilino: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino', required: true },
  dataPagamento: { type: Date, required: true },
  valor: { type: Number, required: true },
  metodo: { type: String, enum: ['pix', 'dinheiro', 'cartao'], required: true },
  status: { type: String, enum: ['pago', 'pendente', 'atrasado'], default: 'pago' }
});

export default mongoose.model('Pagamento', pagamentoSchema);
