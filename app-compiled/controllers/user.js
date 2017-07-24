'use strict';

var _bluebird = require('bluebird');

var _ = require('underscore');
var mongoose = require('mongoose');
var jwt = require("jwt-simple");
var cfg = { jwtSecret: "secret", jwtSession: { session: true } };
module.exports = function (app) {
    var getById = function () {
        var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
            var where, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (req.params.id) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt('return', R.naoEncontrado("Usuario não encontrado!"));

                        case 2:
                            where = { _id: req.params.id };
                            _context.next = 5;
                            return UserBd.findOne(where);

                        case 5:
                            user = _context.sent;

                            if (user) {
                                _context.next = 8;
                                break;
                            }

                            return _context.abrupt('return', R.naoEncontrado("Usuario não encontrado!"));

                        case 8:
                            return _context.abrupt('return', R.sucesso(user));

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function getById(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();

    var login = function () {
        var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
            var user, userData;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            if (!validarParametrosLogin(req)) {
                                _context2.next = 3;
                                break;
                            }

                            return _context2.abrupt('return', R.naoAutorizado("Parametros inválidos"));

                        case 3:
                            user = null;
                            userData = null;
                            _context2.next = 7;
                            return UserBd.findOne({ "email": req.body.email });

                        case 7:
                            user = _context2.sent;

                            if (validarUsuario(user, req.body.password)) {
                                _context2.next = 10;
                                break;
                            }

                            return _context2.abrupt('return', R.naoAutorizado("e-mail ou senha inválido"));

                        case 10:
                            if (!ehProfessor(user)) {
                                _context2.next = 16;
                                break;
                            }

                            _context2.next = 13;
                            return ProfessorBd.findOne({ "user._id": mongoose.Types.ObjectId(user._id) });

                        case 13:
                            userData = _context2.sent;
                            _context2.next = 23;
                            break;

                        case 16:
                            if (!ehAluno(user)) {
                                _context2.next = 22;
                                break;
                            }

                            _context2.next = 19;
                            return AlunoBd.findOne({ "user._id": mongoose.Types.ObjectId(user._id) });

                        case 19:
                            userData = _context2.sent;
                            _context2.next = 23;
                            break;

                        case 22:
                            return _context2.abrupt('return', R.naoAutorizado("Usuario inválido, contate o admininstrador!"));

                        case 23:
                            return _context2.abrupt('return', R.sucesso(builderAutenticacao(user, userData)));

                        case 26:
                            _context2.prev = 26;
                            _context2.t0 = _context2['catch'](0);
                            return _context2.abrupt('return', R.erroServidor(_context2.t0));

                        case 29:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 26]]);
        }));

        return function login(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();

    var recuperarSenha = function () {
        var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
            var where, user;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            where = {};
                            user = null;

                            if (!(!req.body.cpf && !req.body.email)) {
                                _context3.next = 4;
                                break;
                            }

                            return _context3.abrupt('return', R.naoAutorizado("Parametros inválidos"));

                        case 4:

                            if (req.body.email) where.email = req.body.email;
                            if (req.body.cpf) where.cpf = req.body.cpf;

                            _context3.next = 8;
                            return UserBd.findOne(where);

                        case 8:
                            user = _context3.sent;

                            if (user) {
                                _context3.next = 11;
                                break;
                            }

                            return _context3.abrupt('return', R.naoAutorizado("Usuario não encontrado"));

                        case 11:

                            emailRecuperacaoSenha.enviar(user.email, user.password);

                            return _context3.abrupt('return', R.sucesso("Sua senha foi enviada para o e-mail cadastrado!"));

                        case 13:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function recuperarSenha(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();

    var UserBd = app.models.user;
    var AlunoBd = app.models.aluno;
    var ProfessorBd = app.models.professor;
    var emailRecuperacaoSenha = app.lib.emailRecuperacaoSenha;
    var R = app.builder.retorno;

    function validarParametrosLogin(req) {
        return !(req.body.email || req.body.password);
    }

    function validarUsuario(usuario, password) {
        return usuario && usuario.password && password && usuario.password == password;
    }

    function builderAutenticacao(user, userData) {
        var payload = { id: user.id };
        var token = jwt.encode(payload, cfg.jwtSecret);
        return {
            token: token,
            user: user,
            userData: userData
        };
    }

    function ehProfessor(user) {
        return user.perfil == 'PROFESSOR' || user.perfil == 'COORDENADOR';
    }

    function ehAluno(user) {
        return user.perfil == 'ALUNO';
    }

    return { login: login, getById: getById, recuperarSenha: recuperarSenha };
};