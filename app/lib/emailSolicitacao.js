var mailer = require('./mailer.js')();
var fs = require('fs');

module.exports = function(app)
{
    var User = app.models.user;

    return {

        aceita: function(user){
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                     
                    var message = fs.createReadStream('./app/lib/email-template/solicitacao-aceita.html');
                    var subject = "[GURU] - Solicitação de orientação aceita!";
                    var to = users._doc.email;

                    mailer.sendMail( to, subject, message);
                }
            }); 
        },
        recusada: function(user){
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                     
                    var message = fs.createReadStream('./app/lib/email-template/solicitacao-recusada.html');
                    var subject = "[GURU] - Solicitação de orientação recusada!";
                    var to = users._doc.email;

                    mailer.sendMail(to,subject,message);     
                }
            });    
        },
        nova: function(user){
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                     
                    var message = fs.createReadStream('./app/lib/email-template/solicitacao-nova.html');
                    var subject = "[GURU] - Nova Solicitação de orientação recebida!";
                    var to = users._doc.email;

                    mailer.sendMail(to,subject,message);  
                }
            });         
        }
    }

}