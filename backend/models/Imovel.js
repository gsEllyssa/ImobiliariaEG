import mongoose from 'mongoose';

const imovelSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  endereco: { type: String, required: true },
  tipo: { type: String, enum: ['casa', 'apartamento', 'comercial'], required: true },
  valorAluguel: { type: Number },
  disponivel: { type: Boolean, default: true }
});

export default mongoose.model('Imovel', imovelSchema);
