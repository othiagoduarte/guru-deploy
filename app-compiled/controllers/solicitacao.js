"use strict";

var _bluebird = require("bluebird");

var mongoose = require('mongoose');
module.exports = function (app) {
	var save = function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var _solicitacao, query, solicitacao;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_solicitacao = req.body;
							query = { "_id": _solicitacao._id };
							_context.next = 5;
							return SolicitacaoBd.findOneAndUpdate(query, _solicitacao);

						case 5:
							solicitacao = _context.sent;


							if (_solicitacao.status.cod == "R") {
								emailSolicitacao.recusada(_solicitacao.aluno.user);
							}

							if (!(_solicitacao.status.cod == "A")) {
								_context.next = 18;
								break;
							}

							emailSolicitacao.aceita(_solicitacao.aluno.user);

							query = { "aluno._id": _solicitacao.aluno._id };
							set = { "professor": _solicitacao.professor };

							_context.next = 13;
							return ProjetoBd.findOneAndUpdate(query, { $set: set });

						case 13:

							query = { "_id": mongoose.Types.ObjectId(_solicitacao.aluno._id) };
							set = { "orientador": _solicitacao.professor };

							_context.next = 17;
							return AlunoBd.findOneAndUpdate(query, { $set: set });

						case 17:
							return _context.abrupt("return", R.sucesso(solicitacao));

						case 18:
							_context.next = 23;
							break;

						case 20:
							_context.prev = 20;
							_context.t0 = _context["catch"](0);

							R.erroServidor(_context.t0);

						case 23:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 20]]);
		}));

		return function save(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var add = function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var solicitacao, retorno;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							solicitacao = req.body;
							_context2.next = 4;
							return SolicitacaoBd.create(solicitacao);

						case 4:
							retorno = _context2.sent;

							emailSolicitacao.nova(retorno.professor.user);
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

		return function add(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();

	var getByProfessor = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var solicitacoes;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.next = 3;
							return SolicitacaoBd.find({ "professor._id": req.params.idProfessor });

						case 3:
							solicitacoes = _context3.sent;
							return _context3.abrupt("return", R.sucesso(solicitacoes));

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

		return function getByProfessor(_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();

	var getByAluno = function () {
		var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
			var solicitacoes;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.next = 3;
							return SolicitacaoBd.find({ "aluno._id": req.params.idAluno });

						case 3:
							solicitacoes = _context4.sent;
							return _context4.abrupt("return", R.sucesso(solicitacoes));

						case 7:
							_context4.prev = 7;
							_context4.t0 = _context4["catch"](0);
							return _context4.abrupt("return", R.erroServidor(_context4.t0));

						case 10:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4, this, [[0, 7]]);
		}));

		return function getByAluno(_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();

	var SolicitacaoBd = app.models.solicitacao;
	var ProjetoBd = app.models.projeto;
	var AlunoBd = app.models.aluno;
	var emailSolicitacao = app.lib.emailSolicitacao;
	var R = app.builder.retorno;

	;

	return { add: add, save: save, getByAluno: getByAluno, getByProfessor: getByProfessor };
};