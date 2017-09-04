'use strict';

var _bluebird = require('bluebird');

module.exports = function (app) {
	var _this = this;

	var ctrl = app.controllers.aluno;
	var auth = app.passportGuru.authenticate();

	app.get('/aluno', function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var R;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return ctrl.getAll(req, res);

						case 2:
							R = _context.sent;

							res.status(R.status).jsonp(R.data);

						case 4:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}());

	app.get('/aluno/getByUser/:user', function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var R;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return ctrl.getByUser(req, res);

						case 2:
							R = _context2.sent;

							res.status(R.status).jsonp(R.data);

						case 4:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}());

	app.get('/aluno/byMatricula/:matricula', function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var R;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return ctrl.getByMatricula(req, res);

						case 2:
							R = _context3.sent;

							res.status(R.status).jsonp(R.data);

						case 4:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this);
		}));

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}());

	app.get('/aluno/byOrientando/:idProfessor', function () {
		var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
			var R;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.next = 2;
							return ctrl.getByOrientando(req, res);

						case 2:
							R = _context4.sent;

							res.status(R.status).jsonp(R.data);

						case 4:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this);
		}));

		return function (_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}());

	app.post('/aluno', function () {
		var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(req, res) {
			var R;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.next = 2;
							return ctrl.add(req, res);

						case 2:
							R = _context5.sent;

							res.status(R.status).jsonp(R.data);

						case 4:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, _this);
		}));

		return function (_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	}());
};