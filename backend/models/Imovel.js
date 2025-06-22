import mongoose from 'mongoose';

const ImovelSchema = new mongoose.Schema({
  endereco: String,
  tipo: String,
  valorAluguel: Number,
  ativo: { type: Boolean, default: true },
});

export default mongoose.model('Imovel', ImovelSchema);
