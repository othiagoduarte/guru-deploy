var mongoose = require('mongoose');
module.exports = function(app)
{
	var Solicitacao = app.models.solicitacao;	
	var Projeto = app.models.projeto;
	var Aluno = app.models.aluno;
	var emailSolicitacao = app.lib.emailSolicitacao;

	var controller = {};
	
	controller.getAll = getAll;  
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;
	controller.validarNovaSolicitacao = validarNovaSolicitacao;  	
	controller.getByProfessor = getByProfessor;
	controller.getByAluno = getByAluno;
	
	function get (req, res) {	

		Solicitacao.find().exec()
		.then(function(data){
			res.json(data);
		});

	};
 	
	function getAll (req, res) {

		Solicitacao.find().exec()
		.then(function(data){
			res.json(data);
		});
			
	};
	
	function save(req, res){
		
		var _solicitacao = req.body;
		var query = {"_id":_solicitacao._id};

		Solicitacao.findOneAndUpdate(query,_solicitacao)
		.then(function(solicitacoes) {

			if(_solicitacao.status.cod == "R"){
				emailSolicitacao.recusada(_solicitacao.aluno.user);				
			}
			
			if(_solicitacao.status.cod == "A"){
				
				emailSolicitacao.aceita(_solicitacao.aluno.user);
				
				var query = {"aluno._id": _solicitacao.aluno._id}; 
				var set = { "professor":_solicitacao.professor};

				Projeto.findOneAndUpdate(query,{$set:set})
				.then(function(Projetos){
					
					var query = {"_id": mongoose.Types.ObjectId(_solicitacao.aluno._id)}; 
					var set = { "orientador":_solicitacao.professor};
					
					Aluno.findOneAndUpdate(query,{$set:set})
					.then(function(alunos){
						res.status(200).json(solicitacoes._doc);
					},function(error){
						res.status(501).json(error,solicitacoes._doc);						
					});

				},function(error){
					res.status(501).json(error,solicitacoes._doc);										
				});

			}else{
				res.status(200).json(solicitacoes._doc);
			}

		},
		function(erro) {
			console.log(erro);
			res.status(501).json(erro.message);
		});
	};

	function add(req, res){
		
		var _solicitacao = req.body;

		Solicitacao.create(_solicitacao)
		.then(function(solicitacoes) {
			emailSolicitacao.nova(_solicitacao.professor.user);
			res.status(201).json(solicitacoes._doc);
		},
		function(erro) {
			console.log(erro);
			res.status(501).json(erro.message);
		});
	}

	function getByProfessor(req, res){
		
		var _id = req.params.idProfessor;

		Solicitacao.find({"professor._id":_id})
		.then(function(professores){
			res.status(200).json(professores);
		});
	}
	
	function getByAluno(req, res){
		
		var _id = req.params.idAluno;
		
		Solicitacao.find({"aluno._id":_id})
		.then(function(professores){
			res.status(200).json(professores);
		});
	}

	function validarNovaSolicitacao(req, res, next){

		next();
	}

	return controller;

};