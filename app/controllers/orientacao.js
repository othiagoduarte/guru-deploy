var mongoose = require('mongoose');
module.exports = function(app)
{
	var Orientacao = app.models.orientacao;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/
	controller.getByProfessor = getByProfessor;
	controller.getByAluno = getByAluno;

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Orientacao.find().exec()
		.then(function(orientacoes){
			res.json(orientacoes);
		});
			
	};
	
	function save(req, res){
		
		var _orientacao = req.body;
		var query = {"_id":_orientacao._id};

		Orientacao.findOneAndUpdate(query,_orientacao)
		.then(function(orientacoes) {
			res.status(200).json(orientacoes._doc);
		},
		function(erro) {
			console.log(erro);
		});	
	};

	function add(req, res){
		
		var _orientacao = req.body;

		Orientacao.create(_orientacao)
		.then(function(orientacoes) {
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

	return controller;	
};