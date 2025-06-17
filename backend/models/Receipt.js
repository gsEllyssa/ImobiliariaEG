import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  pagamentoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  assinatura: String,
  conteudo: String,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Receipt', receiptSchema);
