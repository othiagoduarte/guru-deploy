module.exports = function(app)
{
	var controller = app.controllers.curso;
	var auth = app.passportGuru.authenticate();
	
	app.route('/curso/:id')
	.get(auth, controller.get);
		
	app.route('/curso')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);
};