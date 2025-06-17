import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  contratoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },
  valor: Number,
  dataPagamento: Date,
  metodo: {
    type: String,
    enum: ['dinheiro', 'pix', 'cartao'],
    default: 'dinheiro'
  },
  status: {
    type: String,
    enum: ['pago', 'pendente'],
    default: 'pendente'
  }
});

export default mongoose.model('Payment', paymentSchema);
