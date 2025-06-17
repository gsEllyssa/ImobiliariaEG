import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  tipo: String,
  endereco: String,
  cidade: String,
  valor: Number,
  disponivel: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Property', propertySchema);
