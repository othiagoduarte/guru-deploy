var mongoose = require('mongoose');

module.exports = function() {
    return mongoose.model('Alunos', mongoose.Schema({  
        nome: {
            type: String,
            required: true
        },
        matricula:  {
            type: String,
            required: true
        },
        apresentacao:  {
            type: String
        },
        curso: {
            type: {}
        },
        orientador:{},
        user:{
            type: {}            
        }
    }));
};