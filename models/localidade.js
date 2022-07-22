const mongoose = require('../database');

const LocalidadeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    nome: {
      type: String,
      require: true,
    },
    distancia: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

const Localidade = mongoose.model(
  'Localidade',
  LocalidadeSchema,
  'localidades',
);
module.exports = Localidade;
