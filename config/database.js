var mongoose = require('mongoose');

module.exports = function(uri) {
    
    //var urlDatabase = 'mongodb://othiaoduarte:tds071289@ds135790/gurudb';
    
    var urlDatabase = 'mongodb://master:master@ds135790.mlab.com:35790/gurudb';
    
    uri = urlDatabase;
  //  urlDatabase = uri ;
    
    mongoose.connect(urlDatabase);
    
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em ' + uri);
    });
    
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de ' + uri);
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