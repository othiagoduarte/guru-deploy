module.exports = function(app)
{
	var auth = app.passportGuru.authenticate();
	var controller = app.controllers.tarefa;
	
	app.route('/tarefa/:id')	
	.get(auth ,controller.get);
	
	app.route('/tarefa')	
	.get(auth, controller.getAll)
	.post(auth, controller.add)
	.put(auth, controller.save);
};