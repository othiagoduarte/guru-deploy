module.exports = function(app)
{
	var controller = app.controllers.contato;
	var auth = app.passportGuru.authenticate();

	app.route('/contato')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);
	
	app.route('/contato/:id')
	.get(auth, controller.get);
};