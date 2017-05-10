module.exports = function(app)
{
	var Comunicado = app.models.comunicado;		
	var controller = {};
	
	controller.getAll = getAll;  
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;  	

	function get (req, res) {	


	};
 	
	function getAll (req, res) {

		Comunicado.find().exec()
		.then(function(comunicados){
			res.json(comunicados);
		});
			
	};
	
	function save(req, res){

		var _comunicado = req.body;
		var query = {"_id":_comunicado._id};

		Comunicado.findOneAndUpdate(query,_comunicado,{ upsert: true, new: true })
		.then(function(orientacoes) {
			res.status(200).json(_comunicado);
		},
		function(erro) {
			res.status(501).json({mensagem:"Erro ao salvar comunicado!"});
			console.log(erro);
		});	
	};

	function add(req, res){
		var _comunicado = req.body;

		Comunicado.create(_comunicado)
		.then(function(comunicados) {
			/**Enviar e-mail de aviso!*/
			res.status(201).json(comunicados._doc);
		},
		function(erro) {
			console.log(erro);
			res.status(501).json(erro.message);
		});
	}

	return controller;	
};