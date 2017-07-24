module.exports = function(app)
{	
	const auth = app.passportGuru.authenticate;
	const ctrl = app.controllers.projeto;
	
	app.get('/projeto/getByAluno/:matriculaAluno', async (req, res) =>{
        const R = await ctrl.getByAluno(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.post('/projeto', async (req, res) =>{
        const R = await ctrl.add(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.put('/projeto', async (req, res) =>{
        const R = await ctrl.save(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.put('/projeto/addEtapa', async (req, res) =>{
        const R = await ctrl.addEtapa(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.post('/projeto/delEtapa', async (req, res) =>{
        const R = await ctrl.delEtapa(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.post('/projeto/editarEtapa', async (req, res) =>{
        const R = await ctrl.editarEtapa(req, res);
        res.status(R.status).jsonp(R.data);
    });
	
	app.post('/projeto/enviarFeedback', async (req, res) =>{
        const R = await ctrl.enviarFeedback(req, res);
        res.status(R.status).jsonp(R.data);
    });	
};