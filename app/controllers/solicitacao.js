const mongoose = require('mongoose');
const _ = require('underscore');

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
			const novaSolicitacao = req.body;
			validarSolicitacao(novaSolicitacao);
			await validarNovaSolicitacao(novaSolicitacao);			
			const retorno = await SolicitacaoBd.create(novaSolicitacao);	
			emailSolicitacao.nova(retorno.professor.user);	
			return R.sucesso(retorno);		
		} catch (error) {
			return R.erroServidor(error);			
		}
	}

	async function getByProfessor(req, res){
		try {
			const solicitacoes =  await SolicitacaoBd.find({"professor._id":req.params.idProfessor}).sort({envio:-1});
			return R.sucesso(solicitacoes);	
		} catch (error) {
			return R.erroServidor(error);
		}
	}
	
	async function getByAluno(req, res){
		try {
			const solicitacoes =  await SolicitacaoBd.find({"aluno._id":req.params.idAluno}).sort({envio:-1});
			return R.sucesso(solicitacoes);	
		} catch (error) {
			return R.erroServidor(error);
		}
	}

	async function validarNovaSolicitacao(novaSolicitacao){
		const solicitacoes = await SolicitacaoBd.find({"aluno._id":novaSolicitacao.aluno._id}).sort({envio:-1});		
		const solicitacoesEnviadas = solicitacoesStatusEnviadas(solicitacoes); 
		if(solicitacoesEnviadas){
			if(_.size(solicitacoesEnviadas) >= 3){
				throw new Error("O número de solicitações enviadas excedeu o limite! Aguarde as respostas");
			}
			if(_.size(_.filter(solicitacoesEnviadas, item => item.professor._id == novaSolicitacao.professor._id))){
				throw new Error(`Já existe uma solicitação de orientação enviada para o professor ${novaSolicitacao.professor.nome}! Aguarde a resposta`);				
			}	
		}
	}

	function solicitacoesStatusEnviadas(solicitacoes){
		return _.filter(solicitacoes, item => item.status.cod == 'E')
	}

	function validarSolicitacao(solicitacao){
		if(!solicitacao){
			throw new Error("Dados da solicitação são obrigatórios");			
		}		
		if(!solicitacao.aluno){
			throw new Error("Dados do aluno são obrigatórios");			
		}
		if(!solicitacao.professor){
			throw new Error("Dados do professor são obrigatórios");			
		}

	}

	

	return {add, save, getByAluno, getByProfessor, }
};