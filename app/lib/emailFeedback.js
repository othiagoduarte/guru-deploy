var mailer = require('./mailer.js')();
var fs = require('fs');

module.exports = function(app)
{
    var User = app.models.user;

    return {

        novo: function(user){
            User.findOne({ _id: user._id})
    	    .then(function(users){
      	        if(users){
                     
                    var message = fs.createReadStream('./app/lib/email-template/feedback.html');
                    var subject = "[GURU] - Novo Feedback Recebido!";
                    var to = users._doc.email;
                    mailer.sendMail(to, subject, message);  
                }
            });         
        }
    }

}