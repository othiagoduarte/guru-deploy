"use strict";

var _bluebird = require("bluebird");

module.exports = function (app) {
	var getAll = function () {
		var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
			var _retorno;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return SkillBd.find();

						case 3:
							_retorno = _context.sent;
							return _context.abrupt("return", R.sucesso(_retorno));

						case 7:
							_context.prev = 7;
							_context.t0 = _context["catch"](0);
							return _context.abrupt("return", R.erroServidor(_context.t0));

						case 10:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 7]]);
		}));

		return function getAll(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();

	var save = function () {
		var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
			var skill, query;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							skill = req.body;
							query = { "_id": skill._id };
							_context2.next = 5;
							return SkillBd.findOneAndUpdate(query, skill, { upsert: true, new: true });

						case 5:
							return _context2.abrupt("return", retorno = _context2.sent);

						case 8:
							_context2.prev = 8;
							_context2.t0 = _context2["catch"](0);
							return _context2.abrupt("return", R.erroServidor(_context2.t0));

						case 11:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, this, [[0, 8]]);
		}));

		return function save(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();

	var remove = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							return _context3.abrupt("return", R.erroServidor("Não implementado"));

						case 1:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this);
		}));

		return function remove(_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();

	var add = function () {
		var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
			var skill, _retorno2;

			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							skill = req.body;
							_context4.next = 4;
							return SkillBd.create(skill);

						case 4:
							_retorno2 = _context4.sent;
							return _context4.abrupt("return", R.sucesso(_retorno2));

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

		return function add(_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();

	var SkillBd = app.models.skill;
	var R = app.builder.retorno;

	return { getAll: getAll, save: save, add: add };
};