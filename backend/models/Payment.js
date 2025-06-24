import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrato' },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquilino' },
  amount: Number,
  paymentDate: Date,
  method: { type: String, enum: ['Pix', 'Cartão', 'Dinheiro'] },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Payment', PaymentSchema);
