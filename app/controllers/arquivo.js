module.exports = function(app)
{
	var fs = require('fs');
	var mongoose = require('mongoose');
	var Contatos = app.models.contato;		
	var Projeto = app.models.projeto;
	var copyFile = app.lib.file.copy;
	//var deleteFile = app.lib.file.delete;
	var emailEntregaEtapa = app.lib.emailEntrega;
	var controller = {};
	
	controller.alunosEtapas = alunosEtapas;  

	function alunosEtapas (req, res) {
		
		var _projeto = req.body.projeto;
		var _etapa = req.body.etapa;
		var _file = req.file;
		var _dirOrigin = _file.path;
		var _dirDestino = ".\\download\\alunos\\etapas\\" + _etapa + _file.originalname.substring(_file.originalname.length - 4, _file.originalname.length);
	
		var query = {"_id": mongoose.Types.ObjectId(_projeto), "etapas._id" :mongoose.Types.ObjectId(_etapa)};
		
		copyFile.copy(_dirOrigin, _dirDestino, function(err){

			if(err){
				res.status(501).json({mensagem:"Erro ao subir o arquivo!",erro:err});
			}

			Projeto.findOneAndUpdate(query, {'etapas.$.entrega': {url: _dirDestino}},{ upsert: true, new: true })
			.then(function(projetos) {
				
				if(projetos){
					res.status(200).json(projetos._doc);
					emailEntregaEtapa.nova(projetos._doc.professor.user);				
				}else{
					res.status(501).json({mensagem:"Erro ao subir o arquivo!"});
					console.log(erro);
				}
			},
			function(erro) {
				res.status(501).json(erro);
				console.log(erro);
			});	

		});

	};

	return controller;	
};