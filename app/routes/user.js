module.exports = function (app) 
{
   	const auth = app.passportGuru.authenticate();
    const ctrl = app.controllers.user;

    app.post("/login", async (req, res) =>{
        const R = await ctrl.login(req, res);
        res.status(R.status).jsonp(R.data);
    });

    app.get("/user/:id", async (req, res) =>{
        const R = await ctrl.getById(req, res);
        console.log()
        res.status(R.status).jsonp(R.data);
    });

    app.post("/user/recuperar", async (req, res) =>{
        const R = await ctrl.recuperarSenha(req, res);
        res.status(R.status).jsonp(R.data);
    });
};