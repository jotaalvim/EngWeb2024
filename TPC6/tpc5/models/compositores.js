var mongoose = require("mongoose")


var compositoreSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nome: String,
    periodo: String,
    dataNasc: Date,
    dataObito: Date,
    bio: String
}, { versionKey: false })

module.exports = mongoose.model('compositores', compositoreSchema)

