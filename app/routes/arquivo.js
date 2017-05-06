var multer  = require('multer');
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, './download/.temp')
      }
});
var upload = multer({ storage: storage});
module.exports = function(app)
{
	var controller = app.controllers.arquivo;
	var auth = app.passportGuru.authenticate();
		
	app.route('/arquivo/alunos/etapas')
	.post(auth, upload.single('file'), controller.alunosEtapas);

};