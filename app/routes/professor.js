module.exports = function(app)
{
	const ctrl = app.controllers.professor;
	const auth = app.passportGuru.authenticate;
	
	app.get('/professor', async (req, res) =>{
        const R = await ctrl.getAll(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.post('/professor', async (req, res) =>{
        const R = await ctrl.add(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.get('/professor/:id', async (req, res) =>{
        const R = await ctrl.get(req, res);
        res.status(R.status).jsonp(R.data);
    });

	app.get('/professor/getByUser/:user', async (req, res) =>{
        const R = await ctrl.getByUser(req, res);
        res.status(R.status).jsonp(R.data);
    });
};