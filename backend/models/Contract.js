import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  tipo: String,
  valor: Number,
  status: String,
  dataInicio: Date,
  dataFim: Date,
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }
});

export default mongoose.model('Contract', contractSchema);
