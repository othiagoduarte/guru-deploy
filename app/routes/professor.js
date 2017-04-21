module.exports = function(app)
{
	var controller = app.controllers.professor;
	var auth = app.passportGuru.authenticate();
	
	app.route('/professor')
	.get(auth, controller.getAll)
	.post(auth, controller.add);
	
	app.route('/professor/:id')
	.get(auth, controller.get);
	
	app.route('/professor/getByUser/:user')
	.get(auth, controller.getByUser);
};