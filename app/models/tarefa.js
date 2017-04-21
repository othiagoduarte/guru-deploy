var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        id_orientacao: {
            type: String,
            required: true
        },
    
    });

    return mongoose.model('Tarefas', schema);
};