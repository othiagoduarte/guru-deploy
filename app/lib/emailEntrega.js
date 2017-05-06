var mailer = require('./mailer.js')();
var fs = require('fs');

module.exports = function(app)
{
    var User = app.models.user;

    return {

        nova: function(user){
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                     
                    var message = fs.createReadStream('./app/lib/email-template/entrega.html');
                    var subject = "[GURU] - Nova Entrega Recebida!";
                    var to = users._doc.email;
                    mailer.sendMail(to, subject, message);  
                }
            });         
        }
    }

}