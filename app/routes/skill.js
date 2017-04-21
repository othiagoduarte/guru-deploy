module.exports = function(app)
{
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.skill;
	
	app.route('/skill')
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);

	app.route('/skill/:id')
	.get(auth, controller.get);
};