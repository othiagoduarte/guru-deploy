var mongoose = require('mongoose');
module.exports = function(app)
{
	var Professor = app.models.professor;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/
	controller.getByUser = getByUser;
	
	function getByUser (req, res) {	
		
		var _user = req.params.user;
		var where = {"user._id": mongoose.Types.ObjectId(_user)};

		Professor.findOne(where)
		.then(function(professores){
			if(professores){
				res.status(200).jsonp(professores);
			}else{
				res.status(404).json({retorno:"Não encontrado"});
			}

		},function(erro){
			res.status(404).json(erro);
		});

	};
	
	function get (req, res) {	
		
		var _id = req.params.id;

		Professor.findOne({"_id":_id})
		.then(function(professores){
			res.status(200).json(professores);
		});

	};
 	
	function getAll (req, res) {

		Professor.find().exec()
		.then(function(professores){
			res.status(200).json(professores);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){
		
		var _professor = req.body;

		Professor.create(_professor)
		.then(function(Professors) {
			res.status(201).json(Professors._doc);
		},
		function(erro) {
			console.log(erro);
		});

	}

	function getAllSkills(){

	}

	return controller;	
};