module.exports = function(app)
{
	var controller = app.controllers.arquivo;
	var auth = app.passportGuru.authenticate();
		
	app.route('/arquivo/alunos/etapas')
	.post(auth, controller.getAll);

};