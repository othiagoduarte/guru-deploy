module.exports = function (app) 
{
   	var auth = app.passportGuru.authenticate();
    var controller = app.controllers.user;
    
    app.route("/login")
    .post(controller.login);

    app.route("/user/:id")
    .get(controller.getById);

    app.route("/user/recuperar")
    .post(controller.recuperarSenha)
};