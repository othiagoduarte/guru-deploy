const mongoose = require('mongoose');
const _ = require('underscore');
module.exports = function(app)
{
	const AlunoBd = app.models.aluno;	
	const ProjetoBd = app.models.projeto;	
	const R = app.builder.retorno;
	
	async function getByMatricula (req, res) {	
		try {
			const where = {"matricula": req.params.matricula};
			const retorno = await  AlunoBd.findOne(where);
			if(!retorno){
				return R.naoEncontrado("Não encontrado");
			}
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);
		}
	};

	async function getByUser (req, res) {	
		try {
			const where = {"user._id": mongoose.Types.ObjectId(req.params.user)};
			const aluno = await AlunoBd.findOne(where);
			if(!aluno){
				return R.naoEncontrado("Não encontrado");
			}
			return R.sucesso(aluno);
		} catch (error) {
			return R.erroServidor(error)
		}
	};
	
	async function getAll (req, res) {
		try {
			const alunos = await AlunoBd.find({});
			return R.sucesso(alunos);
		} catch (error) {
			return R.erroServidor(error);
		}
	};

	async function getByOrientando(req, res){
		try {
			const aggregate = {
				$match : { "professor._id": req.params.idProfessor},
				$unwind : "$aluno",
				$group : { _id:null , alunos:{$addToSet:"$aluno"}},
				$project : {_id: false, alunos: true},
			}
			const retorno = await ProjetoBd.aggregate(
				{$match: aggregate.$match},
				{$unwind: aggregate.$unwind},
				{$group: aggregate.$group},
				{$project: aggregate.$project}
			);
			return R.sucesso(retorno[0]);	
		} catch (error) {
			return R.erroServidor(error);			
		}		
	}

	return {getByMatricula, getByOrientando, getAll, getByUser}
};