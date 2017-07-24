"use strict";

var _bluebird = require("bluebird");

var mongoose = require('mongoose');
module.exports = function (app) {
	var getByUser = function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var where, retorno;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							where = { "user._id": mongoose.Types.ObjectId(req.params.user) };
							_context.next = 4;
							return ProfessorBd.findOne(where);

						case 4:
							retorno = _context.sent;

							if (retorno) {
								_context.next = 7;
								break;
							}

							return _context.abrupt("return", R.naoEncontrado("Professor não encontrado!"));

						case 7:
							return _context.abrupt("return", R.sucesso(retorno));

						case 10:
							_context.prev = 10;
							_context.t0 = _context["catch"](0);
							return _context.abrupt("return", R.erroServidor(_context.t0));

						case 13:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 10]]);
		}));

		return function getByUser(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var get = function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var retorno;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							_context2.next = 3;
							return ProfessorBd.findOne({ "_id": req.params.id });

						case 3:
							retorno = _context2.sent;
							return _context2.abrupt("return", R.sucesso(retorno));

						case 7:
							_context2.prev = 7;
							_context2.t0 = _context2["catch"](0);
							return _context2.abrupt("return", R.erroServidor(_context2.t0));

						case 10:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 7]]);
		}));

		return function get(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();

	var getAll = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var retorno;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.next = 3;
							return ProfessorBd.find();

						case 3:
							retorno = _context3.sent;
							return _context3.abrupt("return", R.sucesso(retorno));

						case 7:
							_context3.prev = 7;
							_context3.t0 = _context3["catch"](0);
							return _context3.abrupt("return", R.erroServidor(_context3.t0));

						case 10:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this, [[0, 7]]);
		}));

		return function getAll(_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();

	var save = function () {
		var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
			var professor, retorno;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							professor = req.body;
							_context4.next = 4;
							return ProfessorBd.create(professor);

						case 4:
							retorno = _context4.sent;
							return _context4.abrupt("return", R.sucesso(retorno));

						case 8:
							_context4.prev = 8;
							_context4.t0 = _context4["catch"](0);
							return _context4.abrupt("return", R.erroServidor(_context4.t0));

						case 11:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4, this, [[0, 8]]);
		}));

		return function save(_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();

	var add = function () {
		var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(req, res) {
			var professor, retorno;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							professor = req.body;
							_context5.next = 4;
							return ProfessorBd.create(professor);

						case 4:
							retorno = _context5.sent;
							return _context5.abrupt("return", R.sucesso(retorno));

						case 8:
							_context5.prev = 8;
							_context5.t0 = _context5["catch"](0);
							return _context5.abrupt("return", R.erroServidor(_context5.t0));

						case 11:
						case "end":
							return _context5.stop();
					}
				}
			}, _callee5, this, [[0, 8]]);
		}));

		return function add(_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	}();

	var ProfessorBd = app.models.professor;
	var R = app.builder.retorno;

	return { getAll: getAll, get: get, save: save, add: add, getByUser: getByUser };
};