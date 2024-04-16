const mongoose = require('mongoose');

// Define schema
const pessoaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  sexo: { type: String, required: true },
  morada: {
    cidade: { type: String, required: true },
    distrito: { type: String, required: true }
  },
  BI: { type: String, required: true },
  descrição: { type: String, required: true },
  profissao: { type: String, required: true },
  partido_politico: {
    party_abbr: { type: String, required: true },
    party_name: { type: String, required: true }
  },
  religiao: { type: String, required: true },
  desportos: [{ type: String, required: true }],
  animais: [{ type: String, required: true }],
  figura_publica_pt: [{ type: String, required: true }],
  marca_carro: { type: String, required: true },
  destinos_favoritos: [{ type: String, required: true }],
  atributos: {
    fumador: { type: Boolean, required: true },
    gosta_cinema: { type: Boolean, required: true },
    gosta_viajar: { type: Boolean, required: true },
    acorda_cedo: { type: Boolean, required: true },
    gosta_ler: { type: Boolean, required: true },
    gosta_musica: { type: Boolean, required: true },
    gosta_comer: { type: Boolean, required: true },
    gosta_animais_estimacao: { type: Boolean, required: true },
    gosta_dancar: { type: Boolean, required: true },
    comida_favorita: { type: String, required: true }
  }
});

// Create model

module.exports = mongoose.model('dataset', pessoaSchema);
