"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema(_defineProperty({
        titulo: { type: String },
        envio: { type: Date, default: Date.now },
        status: {},
        aluno: {},
        professor: {},
        resumo: { type: String }
    }, "status", { type: {}, default: { "cod": "E", "descricao": "Enviado" } }));

    return mongoose.model('Solicitacoes', schema);
};