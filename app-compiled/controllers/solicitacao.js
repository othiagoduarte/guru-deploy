'use strict';

var _bluebird = require('bluebird');

var mongoose = require('mongoose');
var _ = require('underscore');

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
							return _context.abrupt('return', R.sucesso(solicitacao));

						case 18:
							_context.next = 23;
							break;

						case 20:
							_context.prev = 20;
							_context.t0 = _context['catch'](0);

							R.erroServidor(_context.t0);

						case 23:
						case 'end':
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
			var novaSolicitacao, retorno;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							novaSolicitacao = req.body;

							validarSolicitacao(novaSolicitacao);
							_context2.next = 5;
							return validarNovaSolicitacao(novaSolicitacao);

						case 5:
							_context2.next = 7;
							return SolicitacaoBd.create(novaSolicitacao);

						case 7:
							retorno = _context2.sent;

							emailSolicitacao.nova(retorno.professor.user);
							return _context2.abrupt('return', R.sucesso(retorno));

						case 12:
							_context2.prev = 12;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', R.erroServidor(_context2.t0));

						case 15:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 12]]);
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
							return SolicitacaoBd.find({ "professor._id": req.params.idProfessor }).sort({ envio: -1 });

						case 3:
							solicitacoes = _context3.sent;
							return _context3.abrupt('return', R.sucesso(solicitacoes));

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
			var solicitacoes;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.next = 3;
							return SolicitacaoBd.find({ "aluno._id": req.params.idAluno }).sort({ envio: -1 });

						case 3:
							solicitacoes = _context4.sent;
							return _context4.abrupt('return', R.sucesso(solicitacoes));

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

	var validarNovaSolicitacao = function () {
		var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(novaSolicitacao) {
			var solicitacoes, solicitacoesEnviadas;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.next = 2;
							return SolicitacaoBd.find({ "aluno._id": novaSolicitacao.aluno._id }).sort({ envio: -1 });

						case 2:
							solicitacoes = _context5.sent;
							solicitacoesEnviadas = solicitacoesStatusEnviadas(solicitacoes);

							if (!solicitacoesEnviadas) {
								_context5.next = 9;
								break;
							}

							if (!(_.size(solicitacoesEnviadas) >= 3)) {
								_context5.next = 7;
								break;
							}

							throw new Error("O número de solicitações enviadas excedeu o limite! Aguarde as respostas");

						case 7:
							if (!_.size(_.filter(solicitacoesEnviadas, function (item) {
								return item.professor._id == novaSolicitacao.professor._id;
							}))) {
								_context5.next = 9;
								break;
							}

							throw new Error('J\xE1 existe uma solicita\xE7\xE3o de orienta\xE7\xE3o enviada para o professor ' + novaSolicitacao.professor.nome + '! Aguarde a resposta');

						case 9:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this);
		}));

		return function validarNovaSolicitacao(_x9) {
			return _ref5.apply(this, arguments);
		};
	}();

	var SolicitacaoBd = app.models.solicitacao;
	var ProjetoBd = app.models.projeto;
	var AlunoBd = app.models.aluno;
	var emailSolicitacao = app.lib.emailSolicitacao;
	var R = app.builder.retorno;

	;

	function solicitacoesStatusEnviadas(solicitacoes) {
		return _.filter(solicitacoes, function (item) {
			return item.status.cod == 'E';
		});
	}

	function validarSolicitacao(solicitacao) {
		if (!solicitacao) {
			throw new Error("Dados da solicitação são obrigatórios");
		}
		if (!solicitacao.aluno) {
			throw new Error("Dados do aluno são obrigatórios");
		}
		if (!solicitacao.professor) {
			throw new Error("Dados do professor são obrigatórios");
		}
	}

	return { add: add, save: save, getByAluno: getByAluno, getByProfessor: getByProfessor };
};