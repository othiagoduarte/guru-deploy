const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');
const auth = require('./auth.js');
module.exports = function() {	
	const app = express();
	app.passportGuru = auth(app);
	
	app.set('host',process.env.IP || "127.0.0.1");
	app.set('port',process.env.PORT || 3008);
	
	app.use('/', express.static('./public'));
	app.use('/download', express.static('../download'));
	
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(cookieParser());
	app.use(expressSession({secret: 'guru_db'}));

	
	app.use(function(req, res, next){
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, authorization, X-Requested-With');
  	  next();   
	});

	load('models',{cwd: 'app'})
	.then('builder')
	.then('lib')
	.then('controllers')
	.then('services')
	.then('routes')
	.into(app);
	
	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});

	return app;
}