module.exports = function(app)
{
	const auth = app.passportGuru.authenticate();
	const ctrl = app.controllers.solicitacao;
	
	app.post('/solicitacao', async (req, res) =>{
        const R = await ctrl.add(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.put('/solicitacao', async (req, res) =>{
        const R = await ctrl.save(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.get('/solicitacao/ByAluno/:idAluno', async (req, res) =>{
        const R = await ctrl.getByAluno(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.get('/solicitacao/ByProfessor/:idProfessor', async (req, res) =>{
        const R = await ctrl.getByProfessor(req, res);
        res.status(R.status).jsonp(R.data);
    });
};