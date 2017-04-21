var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({  
        id_projeto: {
            type: String,
            required: true
        },
    
    });

    return mongoose.model('Feedbacks', schema);
};