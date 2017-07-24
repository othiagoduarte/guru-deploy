"use strict";

var _bluebird = require("bluebird");

var mongoose = require('mongoose');
module.exports = function (app) {
	var enviarFeedback = function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var projeto;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							projeto = req.body.projeto;

							emailFeedback.novo(req.body.projeto.aluno.user);
							return _context.abrupt("return", editarEtapa(req, res));

						case 3:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function enviarFeedback(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var save = function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var projeto, query, retorno;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							projeto = req.body;
							query = { "_id": projeto._id };
							_context2.next = 5;
							return Projeto.findOneAndUpdate(query, projeto);

						case 5:
							retorno = _context2.sent;
							return _context2.abrupt("return", R.sucesso(retorno));

						case 9:
							_context2.prev = 9;
							_context2.t0 = _context2["catch"](0);
							return _context2.abrupt("return", R.erroServidor(_context2.t0));

						case 12:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 9]]);
		}));

		return function save(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();

	var addEtapa = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var projeto, etapa, query, retorno;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							projeto = req.body.projeto.projeto;
							etapa = req.body.projeto.etapa;
							query = { "_id": mongoose.Types.ObjectId(projeto._id) };
							_context3.next = 6;
							return Projeto.findOneAndUpdate(query, { $push: { 'etapas': etapa } }, { upsert: true, new: true });

						case 6:
							retorno = _context3.sent;
							return _context3.abrupt("return", R.sucesso(retorno));

						case 10:
							_context3.prev = 10;
							_context3.t0 = _context3["catch"](0);
							return _context3.abrupt("return", R.erroServidor(_context3.t0));

						case 13:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this, [[0, 10]]);
		}));

		return function addEtapa(_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();

	var editarEtapa = function () {
		var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
			var projeto, etapa, query, retorno;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							projeto = req.body.projeto;
							etapa = req.body.etapa;
							query = { "_id": mongoose.Types.ObjectId(projeto._id), "etapas._id": mongoose.Types.ObjectId(etapa._id) };
							_context4.next = 6;
							return Projeto.findOneAndUpdate(query, { 'etapas.$': etapa }, { upsert: true, new: true });

						case 6:
							retorno = _context4.sent;
							return _context4.abrupt("return", R.sucesso(retorno));

						case 10:
							_context4.prev = 10;
							_context4.t0 = _context4["catch"](0);
							return _context4.abrupt("return", R.erroServidor(_context4.t0));

						case 13:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4, this, [[0, 10]]);
		}));

		return function editarEtapa(_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();

	var delEtapa = function () {
		var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(req, res) {
			var projeto, etapa, query, retorno;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							projeto = req.body.projeto;
							etapa = req.body.etapa;
							query = { "_id": mongoose.Types.ObjectId(projeto._id), "etapas._id": mongoose.Types.ObjectId(etapa._id) };
							_context5.next = 6;
							return Projeto.findOneAndUpdate(query, { $pull: { 'etapas': { _id: etapa._id } } }, { new: true });

						case 6:
							retorno = _context5.sent;
							return _context5.abrupt("return", R.sucesso(retorno));

						case 10:
							_context5.prev = 10;
							_context5.t0 = _context5["catch"](0);
							return _context5.abrupt("return", R.erroServidor(_context5.t0));

						case 13:
						case "end":
							return _context5.stop();
					}
				}
			}, _callee5, this, [[0, 10]]);
		}));

		return function delEtapa(_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	}();

	var add = function () {
		var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(req, res) {
			var projeto, retorno;
			return regeneratorRuntime.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.prev = 0;
							projeto = req.body;
							_context6.next = 4;
							return Projeto.create(projeto);

						case 4:
							retorno = _context6.sent;
							return _context6.abrupt("return", R.sucesso(retorno));

						case 8:
							_context6.prev = 8;
							_context6.t0 = _context6["catch"](0);
							return _context6.abrupt("return", R.erroServidor(_context6.t0));

						case 11:
						case "end":
							return _context6.stop();
					}
				}
			}, _callee6, this, [[0, 8]]);
		}));

		return function add(_x11, _x12) {
			return _ref6.apply(this, arguments);
		};
	}();

	var getByAluno = function () {
		var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(req, res) {
			var _matriculaAluno, where, retorno;

			return regeneratorRuntime.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							_context7.prev = 0;
							_matriculaAluno = req.params.matriculaAluno;
							where = { "aluno.matricula": _matriculaAluno };
							_context7.next = 5;
							return Projeto.findOne(where);

						case 5:
							retorno = _context7.sent;
							return _context7.abrupt("return", R.sucesso(retorno));

						case 9:
							_context7.prev = 9;
							_context7.t0 = _context7["catch"](0);
							return _context7.abrupt("return", R.erroServidor(_context7.t0));

						case 12:
						case "end":
							return _context7.stop();
					}
				}
			}, _callee7, this, [[0, 9]]);
		}));

		return function getByAluno(_x13, _x14) {
			return _ref7.apply(this, arguments);
		};
	}();

	var Projeto = app.models.projeto;
	var emailFeedback = app.lib.emailFeedback;
	var R = app.builder.retorno;

	;

	return { save: save, add: add, getByAluno: getByAluno, addEtapa: addEtapa, editarEtapa: editarEtapa, delEtapa: delEtapa, enviarFeedback: enviarFeedback };
};