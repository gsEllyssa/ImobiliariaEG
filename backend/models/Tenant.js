// backend/models/Tenant.js
import mongoose from 'mongoose';

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String },
  phone: { type: String },
  currentContract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  }
}, { timestamps: true });

export default mongoose.model('Tenant', TenantSchema);
