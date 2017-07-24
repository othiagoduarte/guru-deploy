module.exports = function(app)
{
	const ComunicadoBd = app.models.comunicado;		
	const R = app.builder.retorno;

	async function getAll (req, res) {
		try {
			const retorno = await ComunicadoBd.find({});
			return R.sucesso(retorno);			
		} catch (error) {
			return R.erroServidor(error);	
		}			
	}
	
	async function save(req, res){
		try {
			const comunicado = req.body;
			const query = {"_id":comunicado._id};
			return retorno = await ComunicadoBd.findOneAndUpdate(query, comunicado,{ upsert: true, new: true });
		} catch (error) {
			return R.erroServidor(error);				
		}
	}

	async function add(req, res){
		try {
			const comunicado = req.body;
			const retorno = await ComunicadoBd.create(comunicado);
			return R.sucesso(retorno);
			/**Enviar e-mail de aviso!*/			
		} catch (error) {
			return R.erroServidor(error);							
		}
	}

	return { getAll, save, add}  
}