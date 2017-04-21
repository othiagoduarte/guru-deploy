//var multer  = require('multer')
var upload = {}// multer({ dest: 'uploads/' })

module.exports = function(app)
{
	var Contatos = app.models.contato;		
	var controller = {};
	
	controller.getAll = getAll;  
	controller.get = get; 		
	controller.save = save; 
	controller.add = add;  	

	function get (req, res) {	


	};
	
	function getAll (req, res) {
		upload.single('avatar');
		console.log(req.file);
		res.status(200).json("Sucesso ao envair arquivo");
	};
	
	function save(req, res){

	};

	function add(req, res){

	}

	return controller;	
};