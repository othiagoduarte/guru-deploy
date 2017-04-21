var mongoose = require('mongoose');

module.exports = function(app)
{
	var Aluno = app.models.aluno;	
	var Projeto = app.models.projeto;	
		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/
	controller.getByMatricula = getByMatricula;	/*BUSCAR PELA MATRICULA*/
	controller.getByUser = getByUser;
	controller.getByOrientando = getByOrientando;
	
	function get (req, res) {	


	};
	
	function getByMatricula (req, res) {	
		
		var _matricula = req.params.matricula;
		var where = {"matricula": _matricula};

		Aluno.findOne(where)
		.then(function(alunos){
			if(alunos){
				res.status(200).jsonp(alunos);
			}else{
				res.status(404).json({retorno:"Não encontrado"});
			}

		},function(erro){
			res.status(404).json(erro);
		});

	};

	function getByUser (req, res) {	
		
		var _user = req.params.user;
		var where = {"user._id": mongoose.Types.ObjectId(_user)};

		Aluno.findOne(where)
		.then(function(alunos){
			if(alunos){
				res.status(200).jsonp(alunos);
			}else{
				res.status(404).json({retorno:"Não encontrado"});
			}

		},function(erro){
			res.status(404).json(erro);
		});

	};
	
	function getAll (req, res) {
		Aluno.find().exec()
		.then(function(alunos){
			res.status(200).jsonp(alunos);
		});
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	
	function getByOrientando(req, res){
		
		var _id = req.params.idProfessor;

		var $match = { "professor._id": _id};
		var $unwind = "$aluno";
		var $group = { _id:null , alunos:{$addToSet:"$aluno"}};
		var $project = {_id: false, alunos: true}

		Projeto.aggregate(
			{$match: $match},
			{$unwind:$unwind},
			{$group:$group},
			{$project:$project}
		).exec()
		.then(function(Projetos){
			res.status(200).jsonp(Projetos[0]);

		},function(error){
			res.status(501).jsonp(error);
		});
	}
	return controller;	
};