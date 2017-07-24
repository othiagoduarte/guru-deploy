const mongoose = require('mongoose');
module.exports = function(app)
{
	const SolicitacaoBd = app.models.solicitacao;	
	const ProjetoBd = app.models.projeto;
	const AlunoBd = app.models.aluno;
	const emailSolicitacao = app.lib.emailSolicitacao;
	const R = app.builder.retorno;
	
	async function save(req, res){
		try {
			let _solicitacao = req.body;
			let query = {"_id":_solicitacao._id};

			const solicitacao = await SolicitacaoBd.findOneAndUpdate(query, _solicitacao);

			if(_solicitacao.status.cod == "R"){
				emailSolicitacao.recusada(_solicitacao.aluno.user);				
			}
				
			if(_solicitacao.status.cod == "A"){
				emailSolicitacao.aceita(_solicitacao.aluno.user);
				
				query = {"aluno._id": _solicitacao.aluno._id}; 
				set = { "professor":_solicitacao.professor};

				await ProjetoBd.findOneAndUpdate(query,{$set:set});
		
				query = {"_id": mongoose.Types.ObjectId(_solicitacao.aluno._id)}; 
				set = { "orientador":_solicitacao.professor};
				
				await AlunoBd.findOneAndUpdate(query,{$set:set});

				return R.sucesso(solicitacao);		
			}
		} catch (error) {
			R.erroServidor(error);
		}
	};

	async function add(req, res){
		try {
			const solicitacao = req.body;
			const retorno = await SolicitacaoBd.create(solicitacao);
			emailSolicitacao.nova(retorno.professor.user);	
			return R.sucesso(retorno);		
		} catch (error) {
			return R.erroServidor(error);			
		}
	}

	async function getByProfessor(req, res){
		try {
			const solicitacoes =  await SolicitacaoBd.find({"professor._id":req.params.idProfessor})
			return R.sucesso(solicitacoes);	
		} catch (error) {
			return R.erroServidor(error);
		}
	}
	
	async function getByAluno(req, res){
		try {
			const solicitacoes =  await SolicitacaoBd.find({"aluno._id":req.params.idAluno})
			return R.sucesso(solicitacoes);	
		} catch (error) {
			return R.erroServidor(error);
		}
	}

	return {add, save, getByAluno, getByProfessor, }
};