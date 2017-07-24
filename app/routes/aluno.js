module.exports = function(app)
{
	const ctrl = app.controllers.aluno;
	const auth = app.passportGuru.authenticate();
		
	app.get('/aluno', async (req, res)=>{
		 const R = await ctrl.getAll(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.get('/aluno/getByUser/:user', async (req, res)=>{
		 const R = await ctrl.getByUser(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.get('/aluno/byMatricula/:matricula', async (req, res)=>{
		 const R = await ctrl.getByMatricula(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.get('/aluno/byOrientando/:idProfessor', async (req, res)=>{
		 const R = await ctrl.getByOrientando(req, res);
		 res.status(R.status).jsonp(R.data);
	});
};