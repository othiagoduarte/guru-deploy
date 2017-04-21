module.exports = function(app)
{
	var controller = app.controllers.feedback;
	var auth = app.passportGuru.authenticate();
	
	app.route('/feedback/:id')
	.get(auth, controller.get);

	app.route('/feedback')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);
};