var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        titulo: {type: String,required: true},
        comunicado: {type: String,required: true},
        tipo: {type: Number ,default: 1},
        url: {type: String},
        data:{ type: Date, default: Date.now} ,

    });

    return mongoose.model('Comunicados', schema);
};