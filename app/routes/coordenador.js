module.exports = function(app)
{
	var controller = app.controllers.coordenador;
	var auth = app.passportGuru.authenticate();
	
	app.route('/coordenador/:id')
	.get(auth, controller.get);
	
	app.route('/coordenador')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);
};