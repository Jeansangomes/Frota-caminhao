const mongoose = require('../database');

const ViagemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    id_caminhao: {
      type: Number,
      require: true,
    },
    id_localidade: {
      type: Number,
      require: true,
    },
    data: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const Viagem = mongoose.model('Viagem', ViagemSchema, 'viagens');
module.exports = Viagem;
