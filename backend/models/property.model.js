// backend/models/Property.js
import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  address: { type: String, required: true },
  type: { type: String, enum: ['Casa', 'Apartamento', 'Kitnet', 'Comercial'], required: true },
  rentValue: { type: Number, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Property', PropertySchema);
