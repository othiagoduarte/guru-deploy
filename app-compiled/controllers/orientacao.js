'use strict';

var _bluebird = require('bluebird');

var mongoose = require('mongoose');
var _ = require('underscore');
module.exports = function (app) {
	var save = function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var orientacao, query, retornoOrientacao;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							orientacao = req.body;
							query = { "_id": req.body._id };
							_context.next = 5;
							return OrientacaoBd.findOneAndUpdate(query, orientacao, { upsert: true, new: true });

						case 5:
							retornoOrientacao = _context.sent;

							if (retornoOrientacao) {
								_context.next = 8;
								break;
							}

							return _context.abrupt('return', R.naoEncontrado("Não encontrado"));

						case 8:
							if (retornoOrientacao.status.cod == "C") {
								emailAgendamento.aceito(retornoOrientacao.aluno.user);
							}
							if (retornoOrientacao.status.cod == "R") {
								emailAgendamento.recusado(retornoOrientacao.aluno.user);
							}
							return _context.abrupt('return', R.sucesso("Sucesso ao salvar os dados"));

						case 13:
							_context.prev = 13;
							_context.t0 = _context['catch'](0);
							return _context.abrupt('return', R.erroServidor(_context.t0));

						case 16:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 13]]);
		}));

		return function save(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var add = function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var orientacao, retorno;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							orientacao = req.body;
							_context2.next = 4;
							return validarOrientacaoPendenteResposta(orientacao);

						case 4:
							if (_context2.sent) {
								_context2.next = 6;
								break;
							}

							return _context2.abrupt('return', R.erroValidacao("Não foi possivel incluir uma orientação. Existe uma solicitação de orientação pendente de resposta"));

						case 6:
							_context2.next = 8;
							return OrientacaoBd.create(orientacao);

						case 8:
							retorno = _context2.sent;

							emailAgendamento.novo(retorno.aluno.user);
							return _context2.abrupt('return', R.sucesso(retorno));

						case 13:
							_context2.prev = 13;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', R.erroServidor(_context2.t0));

						case 16:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 13]]);
		}));

		return function add(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();

	var getByProfessor = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var orientacoes;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.next = 3;
							return OrientacaoBd.find({ "professor._id": req.params.idProfessor });

						case 3:
							orientacoes = _context3.sent;
							return _context3.abrupt('return', R.sucesso(orientacoes));

						case 7:
							_context3.prev = 7;
							_context3.t0 = _context3['catch'](0);
							return _context3.abrupt('return', R.erroServidor(_context3.t0));

						case 10:
						case 'end':
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
			var orientacoes;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.next = 3;
							return OrientacaoBd.find({ "aluno._id": req.params.idAluno });

						case 3:
							orientacoes = _context4.sent;
							return _context4.abrupt('return', R.sucesso(orientacoes));

						case 7:
							_context4.prev = 7;
							_context4.t0 = _context4['catch'](0);
							return _context4.abrupt('return', R.erroServidor(_context4.t0));

						case 10:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this, [[0, 7]]);
		}));

		return function getByAluno(_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();

	var validarOrientacaoPendenteResposta = function () {
		var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(orientacao) {
			var aluno, orientacoes;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							aluno = orientacao.aluno;
							_context5.next = 4;
							return OrientacaoBd.find({ "aluno._id": aluno._id, "status.cod": "E" });

						case 4:
							orientacoes = _context5.sent;
							return _context5.abrupt('return', _.size(orientacoes) == 0);

						case 8:
							_context5.prev = 8;
							_context5.t0 = _context5['catch'](0);

							console.log(_context5.t0);
							return _context5.abrupt('return', false);

						case 12:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this, [[0, 8]]);
		}));

		return function validarOrientacaoPendenteResposta(_x9) {
			return _ref5.apply(this, arguments);
		};
	}();

	var OrientacaoBd = app.models.orientacao;
	var emailAgendamento = app.lib.emailAgendamento;
	var R = app.builder.retorno;

	;

	return { save: save, add: add, getByProfessor: getByProfessor, getByAluno: getByAluno };
};