var mailer = require('./mailer.js')();
var fs = require('fs');

module.exports = function(app)
{
    var User = app.models.user;

    return {

        novo: (email)=>{
            var message = fs.createReadStream('./app/lib/email-template/cadastro.html');
            var subject = "[GURU] - Cadastro realizado com sucesso!";
            var to = email;
            return mailer.sendMail(to, subject, message);  
        }
    }
}