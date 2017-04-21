module.exports = function(app)
{
	var controller = app.controllers.entrega;
	var auth = app.passportGuru.authenticate();
		
	app.route('/entrega/:id')
	.get(auth, controller.get);
	
	app.route('/entrega')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);
};