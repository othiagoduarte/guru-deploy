const mongoose = require('mongoose');
module.exports = function(app)
{
	const ProfessorBd = app.models.professor;	
	const UserBd = app.models.user;			
	const R = app.builder.retorno;
	const emailCadastro = app.lib.emailCadastro;

	async function getByUser (req, res) {	
		try {
			const where = {"user._id": mongoose.Types.ObjectId(req.params.user)};
			const retorno = await  ProfessorBd.findOne(where);
			if(!retorno){
				return R.naoEncontrado("Professor não encontrado!");	
			} 
			return R.sucesso(retorno); 	
		} catch (error) {
			return R.erroServidor(error);
		}
	}
	
	async function get (req, res) {	
		try {
			const retorno = await ProfessorBd.findOne({"_id":req.params.id});
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);			
		}
	}
 	
	async function getAll (req, res) {
		try {
			const retorno = await ProfessorBd.find({"user.perfil":"PROFESSOR"});
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);						
		}
	}
	
	async function save(req, res){
		try {
			const professor = req.body;	
			const query = {"_id":professor._id};
			const professorAtualizado = {
				nome:professor.nome, 
				titulo: professor.titulo, 
				vagas:professor.vagas			
			}
			const retorno = await ProfessorBd.findOneAndUpdate(query, professorAtualizado,{ upsert: true, new: true })
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);									
		}
	}

	async function add(req, res){
		try {
			const professor = req.body;
			professor.user = await UserBd.create({
				email: professor.user.email,
				password: "guru2017",
				perfil: "PROFESSOR"
			});		
			const retorno = await ProfessorBd.create(professor);
			await emailCadastro.novo(professor.email);			
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);									
		}
	}

	return {getAll, get, save, add, getByUser}
};