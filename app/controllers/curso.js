module.exports = function(app)
{
	var Curso = app.models.curso;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Curso.find().exec()
		.then(function(cursos){
			res.json(cursos);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};