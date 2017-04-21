module.exports = function(app)
{
	var controller = app.controllers.orientacao;
	var auth = app.passportGuru.authenticate();
	
	app.route('/orientacao/:id')
	.get(auth, controller.get);
	
	app.route('/orientacao')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);

	app.route('/orientacao/ByAluno/:idAluno')
	.get(auth, controller.getByAluno);

	app.route('/orientacao/ByProfessor/:idProfessor')
	.get(auth, controller.getByProfessor);
};