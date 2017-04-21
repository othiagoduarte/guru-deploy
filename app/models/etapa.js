var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        titulo: {
            type: String,
        },
        resumo: {
            type: String,
        },
        dataCritica:{ type: Date },
        tarefas:[],
        feedback:[]

    });

    return mongoose.model('Etapas', schema);
};