module.exports = function(app)
{
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.comunicado;
	
	app.route('/comunicado/:id')
	.get(auth ,controller.get);
	
	app.route('/comunicado')
	.get(auth, controller.getAll)
	.post(auth,controller.add)
	.put(auth ,controller.save);
};