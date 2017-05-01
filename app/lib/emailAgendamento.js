var mailer = require('./mailer.js')();
var fs = require('fs');

module.exports = function(app)
{
    var User = app.models.user;

    return {

        aceito: function(user){
            
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                    
                    var message = fs.createReadStream('./app/lib/email-template/agendamento-confirmado.html');
                    var subject = "[GURU] - Agendamento de Orientação Aceito!";
                    var to = users._doc.email;

                    mailer.sendMail( to, subject, message);                  
                }
            });        
        },
        recusado: function(user){
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                    
                    var message = fs.createReadStream('./app/lib/email-template/agendamento-recusado.html');
                    var subject = "[GURU] - Agendamento de Orientação Recusado!";
                    var to = users._doc.email;

                    mailer.sendMail(to,subject,message);
                  }
            });        
        },
        novo: function(user){

            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                    
                    var message = fs.createReadStream('./app/lib/email-template/agendamento-novo.html');
                    var subject = "[GURU] - Novo Agendamento de Orientação Recebido!";
                    var to = users._doc.email;

                    mailer.sendMail(to,subject,message); 
                }
            });           
        }
    }

}