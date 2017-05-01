var mongoose = require('mongoose');

module.exports = function(app)
{
	var Projeto = app.models.projeto;	
	var _emailFeedback = app.lib.emailFeedback;	
	var controller = {};
	
	controller.save = save; 
	controller.add = add;  	
	controller.getByAluno = getByAluno;
	controller.addEtapa = addEtapa;
	controller.editarEtapa = editarEtapa;
	controller.delEtapa = delEtapa;
	controller.emailFeedback = emailFeedback;

	function emailFeedback(req, res, next){
		var _projeto = req.body.projeto;
		_emailFeedback.novo(req.body.projeto.aluno.user);
		next();
	}

	function save(req, res){
		
		var _projeto = req.body;
		var query = {"_id":_projeto._id};

		Projeto.findOneAndUpdate(query,_projeto)
		.then(function(projetos) {
			res.status(200).json(projetos._doc);
		},
		function(erro) {
			console.log(erro);
		});	
	};

	function addEtapa(req, res){
		
		var _projeto = req.body.projeto.projeto;
		var _etapa = req.body.projeto.etapa;
		var query = {"_id":mongoose.Types.ObjectId(_projeto._id)};
		
		Projeto.findOneAndUpdate(query, {$push:  {'etapas': _etapa}},{ upsert: true, new: true })
		.then(function(projetos) {
			
			if(projetos){
				res.status(200).json(projetos._doc);
			}else{
				res.status(501).json({});
				console.log(erro);
			}
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});	
	}
	
	function editarEtapa(req, res){
		
		var _projeto = req.body.projeto;
		var _etapa = req.body.etapa;
		
		var query = {"_id":mongoose.Types.ObjectId(_projeto._id), "etapas._id" :mongoose.Types.ObjectId(_etapa._id)};
		
		Projeto.findOneAndUpdate(query, {'etapas.$': _etapa},{ upsert: true, new: true })
		.then(function(projetos) {
			
			if(projetos){
				res.status(200).json(projetos._doc);
			}else{
				res.status(501).json({});
				console.log(erro);
			}
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});	
	};
	
	function delEtapa(req, res){

		var _projeto = req.body.projeto;
		var _etapa = req.body.etapa;
		
		var query = {"_id":mongoose.Types.ObjectId(_projeto._id), "etapas._id" :mongoose.Types.ObjectId(_etapa._id)};
	
		Projeto.findOneAndUpdate(query, {$pull:  {'etapas': { _id : _etapa._id }}} , {new: true })
		.then(function(projetos) {
			
			if(projetos){
				res.status(200).json(projetos._doc);
			}else{
				res.status(501).json({retorno :"Não encontrado!"});
				console.log(erro);
			}
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});	
	}
	
	function add(req, res){
		
		var _projeto = req.body;

		Projeto.create(_projeto)
		.then(function(projetos) {
			res.status(201).json(projetos._doc);
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});		
	}

	function getByAluno(req, res){

		var _matriculaAluno  = req.params.matriculaAluno;
		var where = {"aluno.matricula":_matriculaAluno};

		Projeto.findOne(where)
		.then(function(projetos){
			res.status(200).jsonp(projetos);
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});		
	}

	return controller;	
};