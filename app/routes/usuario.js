module.exports = function(app)
{
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.usuario;
	
	app.route('/usuario/:id')
	.get(auth ,controller.get);
	
	app.route('/usuario')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);

};