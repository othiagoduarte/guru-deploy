var mongoose = require('mongoose');
module.exports = function(urlDatabase) {
    mongoose.connect(urlDatabase.trim());
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em ' + urlDatabase);
    });
    
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de ' + urlDatabase);
    });
    
    mongoose.connection.on('error', function(erro) {
        console.log('Mongoose! Erro na conexão: ' + erro);
    });
    
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose! Desconectado pelo término da aplicação');
            // 0 indica que a finalização ocorreu sem erros
            process.exit(0);
        });
    });
}