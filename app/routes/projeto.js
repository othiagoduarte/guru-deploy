module.exports = function(app)
{	
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.projeto;
	

	app.route('/projeto/getByAluno/:matriculaAluno')
	.get(auth ,controller.getByAluno);
	
	app.route('/projeto')
	.post(auth, controller.add)
	.put(auth, controller.save);	
	
	app.route('/projeto/addEtapa')
	.put(auth, controller.addEtapa);

	app.route('/projeto/delEtapa')
	.post(auth, controller.delEtapa);

	app.route('/projeto/editarEtapa')
	.post(auth, controller.editarEtapa);	
	
	app.route('/projeto/enviarFeedback')
	.post(auth, controller.emailFeedback, controller.editarEtapa);	
	
	
};