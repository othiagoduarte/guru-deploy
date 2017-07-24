"use strict";

var _bluebird = require("bluebird");

module.exports = function (app) {
       var _this = this;

       var ctrl = app.controllers.orientacao;
       var auth = app.passportGuru.authenticate();

       app.post("/orientacao", function () {
              var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                   switch (_context.prev = _context.next) {
                                          case 0:
                                                 _context.next = 2;
                                                 return ctrl.add(req, res);

                                          case 2:
                                                 R = _context.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case "end":
                                                 return _context.stop();
                                   }
                            }
                     }, _callee, _this);
              }));

              return function (_x, _x2) {
                     return _ref.apply(this, arguments);
              };
       }());

       app.put("/orientacao", function () {
              var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                   switch (_context2.prev = _context2.next) {
                                          case 0:
                                                 _context2.next = 2;
                                                 return ctrl.save(req, res);

                                          case 2:
                                                 R = _context2.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case "end":
                                                 return _context2.stop();
                                   }
                            }
                     }, _callee2, _this);
              }));

              return function (_x3, _x4) {
                     return _ref2.apply(this, arguments);
              };
       }());

       app.get('/orientacao/ByAluno/:idAluno', function () {
              var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                   switch (_context3.prev = _context3.next) {
                                          case 0:
                                                 _context3.next = 2;
                                                 return ctrl.getByAluno(req, res);

                                          case 2:
                                                 R = _context3.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case "end":
                                                 return _context3.stop();
                                   }
                            }
                     }, _callee3, _this);
              }));

              return function (_x5, _x6) {
                     return _ref3.apply(this, arguments);
              };
       }());

       app.get('/orientacao/ByProfessor/:idProfessor', function () {
              var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                   switch (_context4.prev = _context4.next) {
                                          case 0:
                                                 _context4.next = 2;
                                                 return ctrl.getByProfessor(req, res);

                                          case 2:
                                                 R = _context4.sent;

                                                 console.log(R);
                                                 res.status(R.status).jsonp(R.data);

                                          case 5:
                                          case "end":
                                                 return _context4.stop();
                                   }
                            }
                     }, _callee4, _this);
              }));

              return function (_x7, _x8) {
                     return _ref4.apply(this, arguments);
              };
       }());
};