var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        
        nome :{
            type: String
        },
    });

    return mongoose.model('Coordenadores', schema);
};