module.exports = function(app)
{
	var Contatos = app.models.contato;		
	var controller = {};
	
	controller.getAll = getAll; /*BUSCAR TODOS*/ 
	controller.get = get; 		/*BUSCAR POR ID*/
	controller.save = save; /*ATUALIZAR POR ID*/
	controller.add = add;  	/*INSERIR NOVO*/

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Contatos.find().exec()
		.then(function(contatos){
			res.json(contatos);
		});
			
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};