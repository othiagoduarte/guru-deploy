module.exports = function(app)
{
	const auth = app.passportGuru.authenticate;
	const ctrl = app.controllers.skill;
	
	app.get('/skill', async (req, res)=>{
		 const R = await ctrl.getAll(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.post('/skill', async (req, res)=>{
		 const R = await ctrl.add(req, res);
		 res.status(R.status).jsonp(R.data);
	});

	app.put('/skill', async (req, res)=>{
		 const R = await ctrl.save(req, res);
		 res.status(R.status).jsonp(R.data);
	});

};