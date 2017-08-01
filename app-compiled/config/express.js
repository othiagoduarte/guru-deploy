'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = init;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressLoad = require('express-load');

var _expressLoad2 = _interopRequireDefault(_expressLoad);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _auth = require('./auth.js');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {

	var app = (0, _express2.default)();
	app.passportGuru = (0, _auth2.default)(app);

	app.set('host', process.env.IP || "127.0.0.1");
	app.set('port', process.env.PORT || 3008);

	app.use('/', _express2.default.static('../api/public'));
	app.use('/download', _express2.default.static('../api/download'));

	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(require('method-override')());
	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());
	app.use((0, _cookieParser2.default)());
	app.use((0, _expressSession2.default)({ secret: 'guru_db' }));

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, authorization, X-Requested-With');
		next();
	});

	(0, _expressLoad2.default)('models', { cwd: 'app' }).then('builder').then('lib').then('controllers').then('services').then('routes').into(app);

	app.listen(app.get('port'), function () {
		console.log('Node app is running on port', app.get('port'));
	});

	return app;
}