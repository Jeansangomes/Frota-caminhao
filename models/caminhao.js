const mongoose = require('../database');

const CaminhaoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    apelido: {
      type: String,
      require: true,
    },
    placa: {
      type: String,
      require: true,
      unique: true,
    },
    ano: {
      type: String,
      require: true,
    },
    cor: {
      type: String,
      require: true,
    },
    rendimento: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

const Caminhao = mongoose.model('Caminhao', CaminhaoSchema, 'caminhoes');
module.exports = Caminhao;
