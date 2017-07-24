module.exports = function(app)
{
	const SkillBd = app.models.skill;		
	const R = app.builder.retorno;

	async function getAll (req, res) {
		try {
			const retorno = await SkillBd.find();
			return R.sucesso(retorno);			
		} catch (error) {
			return R.erroServidor(error);	
		}			
	}
	
	async function save(req, res){
		try {
			const skill = req.body;
			const query = {"_id":skill._id};
			return retorno = await SkillBd.findOneAndUpdate(query, skill,{ upsert: true, new: true });
		} catch (error) {
			return R.erroServidor(error);				
		}
	}

	async function remove(req, res){
		return R.erroServidor("Não implementado");				
	}

	async function add(req, res){
		try {
			const skill = req.body;
			const retorno = await SkillBd.create(skill);
			return R.sucesso(retorno);			
		} catch (error) {
			return R.erroServidor(error);							
		}
	}

	return { getAll, save, add}  
}