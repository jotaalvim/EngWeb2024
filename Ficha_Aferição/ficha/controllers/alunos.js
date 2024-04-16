var mongodb = require('mongoose')

const { modelName } = require ('../models/alunos')
var Pessoa = require("../models/alunos")

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.insert = (aluno) => {
    console.log(aluno)
    return new Pessoa(aluno).save()
}



module.exports.updateByName = (name, aluno) => {
    return Pessoa
        .findOneAndUpdate({ nome: name }, aluno, { new: true })
        .exec()
        .catch(err => {
            console.error(err);
            throw err;
        });
}


module.exports.deleteByName = (name) => {
    return Pessoa
        .findOneAndRemove({ nome: name })
        .exec()
}

module.exports.listModalidades = () => {
    return Pessoa
        .aggregate([
            { $unwind: "$desportos" },
            { $group: { _id: null, desportos: { $addToSet: "$desportos" } } }
        ])
        .exec();
}

module.exports.listPessoasbyModalidaes = (id) => {
    return Pessoa
        .find({ desportos: id } ,{ nome:1, _id:0})
        .exec()
}