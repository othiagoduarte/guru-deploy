'use strict';

var _bluebird = require('bluebird');

var mongoose = require('mongoose');
var _ = require('underscore');
module.exports = function (app) {
	var getByMatricula = function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var where, retorno;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							where = { "matricula": req.params.matricula };
							_context.next = 4;
							return AlunoBd.findOne(where);

						case 4:
							retorno = _context.sent;

							if (retorno) {
								_context.next = 7;
								break;
							}

							return _context.abrupt('return', R.naoEncontrado("Não encontrado"));

						case 7:
							return _context.abrupt('return', R.sucesso(retorno));

						case 10:
							_context.prev = 10;
							_context.t0 = _context['catch'](0);
							return _context.abrupt('return', R.erroServidor(_context.t0));

						case 13:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 10]]);
		}));

		return function getByMatricula(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var getByUser = function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var where, aluno;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							where = { "user._id": mongoose.Types.ObjectId(req.params.user) };
							_context2.next = 4;
							return AlunoBd.findOne(where);

						case 4:
							aluno = _context2.sent;

							if (aluno) {
								_context2.next = 7;
								break;
							}

							return _context2.abrupt('return', R.naoEncontrado("Não encontrado"));

						case 7:
							return _context2.abrupt('return', R.sucesso(aluno));

						case 10:
							_context2.prev = 10;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', R.erroServidor(_context2.t0));

						case 13:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 10]]);
		}));

		return function getByUser(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();

	var getAll = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var alunos;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							_context3.next = 3;
							return AlunoBd.find({});

						case 3:
							alunos = _context3.sent;
							return _context3.abrupt('return', R.sucesso(alunos));

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

		return function getAll(_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();

	var getByOrientando = function () {
		var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
			var aggregate, retorno;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							aggregate = {
								$match: { "professor._id": req.params.idProfessor },
								$unwind: "$aluno",
								$group: { _id: null, alunos: { $addToSet: "$aluno" } },
								$project: { _id: false, alunos: true }
							};
							_context4.next = 4;
							return ProjetoBd.aggregate({ $match: aggregate.$match }, { $unwind: aggregate.$unwind }, { $group: aggregate.$group }, { $project: aggregate.$project });

						case 4:
							retorno = _context4.sent;
							return _context4.abrupt('return', R.sucesso(retorno[0]));

						case 8:
							_context4.prev = 8;
							_context4.t0 = _context4['catch'](0);
							return _context4.abrupt('return', R.erroServidor(_context4.t0));

						case 11:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this, [[0, 8]]);
		}));

		return function getByOrientando(_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();

	var add = function () {
		var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(req, res) {
			var aluno, retorno;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.prev = 0;
							aluno = req.body.aluno;

							aluno.apresentacao = "Cadastro incompleto";
							_context5.next = 5;
							return UserBd.create({
								email: aluno.user.email,
								password: "guru2017",
								perfil: "ALUNO"
							});

						case 5:
							aluno.user = _context5.sent;
							_context5.next = 8;
							return AlunoBd.create(aluno);

						case 8:
							retorno = _context5.sent;
							_context5.next = 11;
							return emailCadastro.novo(aluno.email);

						case 11:
							return _context5.abrupt('return', R.sucesso(retorno));

						case 14:
							_context5.prev = 14;
							_context5.t0 = _context5['catch'](0);
							return _context5.abrupt('return', R.erroServidor(_context5.t0));

						case 17:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this, [[0, 14]]);
		}));

		return function add(_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	}();

	var AlunoBd = app.models.aluno;
	var ProjetoBd = app.models.projeto;
	var UserBd = app.models.user;
	var R = app.builder.retorno;
	var emailCadastro = app.lib.emailCadastro;

	;

	;

	;

	return { getByMatricula: getByMatricula, getByOrientando: getByOrientando, getAll: getAll, getByUser: getByUser, add: add };
};