module.exports = function(app)
{
	var Skill = app.models.skill;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	

		Skill.find().exec()
		.then(function(Skills){
			res.json(Skills);
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});
	};
 	
	function getAll (req, res) {

		Skill.find().exec()
		.then(function(Skills){
			res.status(200).json(Skills);
		},
		function(erro) {
			res.status(501).json(erro);
			console.log(erro);
		});
			
	};
	
	function save(req, res){

	};

	function remove(req, res){

	};

	function add(req, res){
		
		var _skill = req.body;

		Skill.create(_skill)
		.then(function(Skills) {
			res.status(201).json(Skills._doc);
		},
		function(erro) {
			console.log(erro);
		});	
	}

	return controller;	
};