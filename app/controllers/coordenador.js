module.exports = function(app)
{
	var Coordenador = app.models.coordenador;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Coordenador.find().exec()
		.then(function(data){
			res.json(data);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};