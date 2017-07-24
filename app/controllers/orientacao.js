const mongoose = require('mongoose');
const _ = require('underscore');
module.exports = function(app)
{
	const OrientacaoBd = app.models.orientacao;	
	const emailAgendamento = app.lib.emailAgendamento;
	const R = app.builder.retorno;

	async function save(req, res){
		try {
			const orientacao = req.body;
			const query = {"_id": req.body._id};
			const retornoOrientacao = await OrientacaoBd.findOneAndUpdate(query, orientacao, { upsert: true, new: true });
			if(!retornoOrientacao){
				return R.naoEncontrado("Não encontrado");
			}
			if(retornoOrientacao.status.cod == "C"){
				emailAgendamento.aceito(retornoOrientacao.aluno.user);
			}
			if(retornoOrientacao.status.cod == "R"){
				emailAgendamento.recusado(retornoOrientacao.aluno.user);
			}
			return R.sucesso("Sucesso ao salvar os dados");
		} catch (error) {
			return R.erroServidor(error)
		}					
	};

	async function add(req, res){
		try {
			const orientacao = req.body;
			if(! await validarOrientacaoPendenteResposta(orientacao)){
				return R.erroValidacao("Não foi possivel incluir uma orientação. Existe uma solicitação de orientação pendente de resposta");
			}
			const retorno = await OrientacaoBd.create(orientacao);		
			emailAgendamento.novo(retorno.aluno.user);
			return R.sucesso(retorno);
		} catch (error) {
			return R.erroServidor(error);			
		}
	}

	async function getByProfessor(req, res){
		try {
			const orientacoes = await OrientacaoBd.find({"professor._id":req.params.idProfessor});
			return R.sucesso(orientacoes);			
		} catch (error) {
			return R.erroServidor(error);
		}			
	}
	
	async function getByAluno(req, res){
		try {
			const orientacoes = await OrientacaoBd.find({"aluno._id":req.params.idAluno});
			return R.sucesso(orientacoes);
		} catch (error) {
			return R.erroServidor(error);			
		}		
	}

	async function validarOrientacaoPendenteResposta(orientacao){
		try {
			const aluno = orientacao.aluno;
			const orientacoes = await OrientacaoBd.find({"aluno._id": aluno._id, "status.cod":"E"});
			return _.size(orientacoes) == 0;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	return {save, add, getByProfessor, getByAluno}
}