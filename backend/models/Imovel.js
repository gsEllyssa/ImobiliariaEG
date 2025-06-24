import mongoose from 'mongoose';

const ImovelSchema = new mongoose.Schema({
  endereco: String,
  tipo: String, // Casa, Apto...
  amount: Number,
  disponivel: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Imovel', ImovelSchema);
