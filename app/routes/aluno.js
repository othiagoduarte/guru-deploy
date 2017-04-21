module.exports = function(app)
{
	var controller = app.controllers.aluno;
	var auth = app.passportGuru.authenticate();
		
	app.route('/aluno/:id')
	.get(auth, controller.get);
	
	app.route('/aluno/getByUser/:user')
	.get(auth, controller.getByUser);
	
	app.route('/aluno/byMatricula/:matricula')
	.get(auth, controller.getByMatricula);
	
	app.route('/aluno/byOrientando/:idProfessor')
	.get(auth, controller.getByOrientando);
	
	app.route('/aluno')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);

};