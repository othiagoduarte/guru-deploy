var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');
var auth = require('./auth.js');
module.exports = function()
{
	var app = express();
	
		
	app.passportGuru = auth(app);
	
	app.set('host',process.env.IP || "127.0.0.1");
	app.set('port',process.env.PORT || 3008);
	app.use(express.static('./public'));
	app.use(express.static(__dirname + '/public'));

	app.set('view engine','ejs');
	app.set('views','./app/views');
	
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
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, authorization');
  	  next();   
	});

	load('models',{cwd: 'app'})
	.then('lib')
	.then('controllers')
	.then('routes')
	.into(app);
	
	app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});

	return app;
};