module.exports = function(app)
{
	const ctrl = app.controllers.orientacao;
	const auth = app.passportGuru.authenticate();
	
	app.post("/orientacao", async (req, res) =>{
        const R = await ctrl.add(req, res);
        res.status(R.status).jsonp(R.data);
    });
	
	app.put("/orientacao", async (req, res) =>{
        const R = await ctrl.save(req, res);
        res.status(R.status).jsonp(R.data);
    });
	
	app.get('/orientacao/ByAluno/:idAluno', async (req, res) =>{
        const R = await ctrl.getByAluno(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.get('/orientacao/ByProfessor/:idProfessor', async (req, res) =>{
        const R = await ctrl.getByProfessor(req, res);
        console.log(R)
        res.status(R.status).jsonp(R.data);
    });

};