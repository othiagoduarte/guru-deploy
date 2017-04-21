module.exports = function(app)
{
	var Entrega = app.models.entrega;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Entrega.find().exec()
		.then(function(entregas){
			res.json(entregas);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};