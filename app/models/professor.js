var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        nome: {
            type: String,
            required: true
        },
        titulo:  {
            type: String,
            
        },
        skills :[String]
        ,
        disponivel: Boolean
    });

    return mongoose.model('Professores', schema);
};