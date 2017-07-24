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
							return ComunicadoBd.find({});

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
			var comunicado, query;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							comunicado = req.body;
							query = { "_id": comunicado._id };
							_context2.next = 5;
							return ComunicadoBd.findOneAndUpdate(query, comunicado, { upsert: true, new: true });

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

	var add = function () {
		var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
			var comunicado, _retorno2;

			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;
							comunicado = req.body;
							_context3.next = 4;
							return ComunicadoBd.create(comunicado);

						case 4:
							_retorno2 = _context3.sent;
							return _context3.abrupt("return", R.sucesso(_retorno2));

						case 8:
							_context3.prev = 8;
							_context3.t0 = _context3["catch"](0);
							return _context3.abrupt("return", R.erroServidor(_context3.t0));

						case 11:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, this, [[0, 8]]);
		}));

		return function add(_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();

	var ComunicadoBd = app.models.comunicado;
	var R = app.builder.retorno;

	return { getAll: getAll, save: save, add: add };
};