const nodemailer = require('nodemailer');
module.exports = function(app)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'guru.senac@gmail.com',
            pass: 'tds071289'
        }
    });

    var mailOptions = {
        from: '"Guru Academico" <guru.senac@gmail.com>', 
        to: '', 
        subject: '', 
        text: '', 
        html: '' 
    };

    return {
        sendMail: function(to,subject,message){
            
            mailOptions.to = to;
            mailOptions.subject = subject;
            mailOptions.text = message;
            mailOptions.html = message;
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            
        }
    };
}