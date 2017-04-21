module.exports = function(app)
{	
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.projeto;
	
	app.route('/projeto/:id')
	.get(auth ,controller.get);

	app.route('/projeto/getByAluno/:matriculaAluno')
	.get(auth ,controller.getByAluno);
	
	app.route('/projeto')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);	
	
	app.route('/projeto/addEtapa')
	.put(auth, controller.addEtapa);

	app.route('/projeto/delEtapa')
	.post(auth, controller.delEtapa);

	app.route('/projeto/editarEtapa')
	.post(auth, controller.editarEtapa);	
	
};