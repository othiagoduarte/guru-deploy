var mongoose = require('mongoose');
module.exports = function(app)
{
	var Orientacao = app.models.orientacao;	
	var emailAgendamento = app.lib.emailAgendamento;	
		
	var controller = {};
	
	controller.getAll = getAll; 
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;  	
	controller.getByProfessor = getByProfessor;
	controller.getByAluno = getByAluno;
 	
	function getAll (req, res) {

		Orientacao.find().exec()
		.then(function(orientacoes){
			res.json(orientacoes);
		});
			
	};
	
	function save(req, res){
		
		var _orientacao = req.body;
		var query = {"_id":_orientacao._id};

		Orientacao.findOneAndUpdate(query,_orientacao,{ upsert: true, new: true })
		.then(function(orientacoes) {
			
			var _orientacao = orientacoes._doc;

			if(_orientacao.status.cod == "C"){
				emailAgendamento.aceito(_orientacao.aluno.user);
			}
			
			if(_orientacao.status.cod == "R"){
				emailAgendamento.recusado(_orientacao.aluno.user);
			}
			
			res.status(200).json(_orientacao);
		},
		function(erro) {
			console.log(erro);
		});	
	};

	function add(req, res){
		
		var _orientacao = req.body;

		Orientacao.create(_orientacao)
		.then(function(orientacoes) {
			emailAgendamento.novo(orientacoes._doc.aluno.user);
			res.status(201).json(orientacoes._doc);
		},
		function(erro) {
			console.log(erro);
			res.status(501).json(erro.message);
		});
	}

	function getByProfessor(req, res){
		
		var _id = req.params.idProfessor;

		Orientacao.find({"professor._id":_id})
		.then(function(orientacoes){
			res.status(200).json(orientacoes);
		});
	}
	
	function getByAluno(req, res){
		var _id = req.params.idAluno;
		
		Orientacao.find({"aluno._id":_id})
		.then(function(orientacoes){
			res.status(200).json(orientacoes);
		});
	}
	
	function get (req, res) {	


	};

	return controller;	
};