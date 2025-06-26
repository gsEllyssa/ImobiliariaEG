import mongoose from 'mongoose';

const ContratoSchema = new mongoose.Schema({
  locador: String,
  cpfLocador: String,

  locatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inquilino'
  },

  cpfLocatario: String,

  imovel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Imovel',
  },

  enderecoImovel: String,
  valorAluguel: Number,
  prazo: String,
  dataInicio: Date,
  dataFim: Date,
  vencimento: Date,

  garantias: {
    fiador: Boolean,
    caucao: Boolean,
    seguroFianca: Boolean
  },

  observacoes: String
}, { timestamps: true });

export default mongoose.model('Contrato', ContratoSchema);
