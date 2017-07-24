module.exports = function(app)
{
	const auth = app.passportGuru.authenticate;
	const ctrl = app.controllers.comunicado;
	
	app.get('/comunicado', async (req, res)=>{
		 const R = await ctrl.getAll(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.post('/comunicado', async (req, res)=>{
		 const R = await ctrl.add(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.put('/comunicado', async (req, res)=>{
		 const R = await ctrl.save(req, res);
		 res.status(R.status).jsonp(R.data);
	});
};