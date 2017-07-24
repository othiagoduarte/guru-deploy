'use strict';

var _bluebird = require('bluebird');

module.exports = function (app) {
       var _this = this;

       var auth = app.passportGuru.authenticate;
       var ctrl = app.controllers.projeto;

       app.get('/projeto/getByAluno/:matriculaAluno', function () {
              var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                   switch (_context.prev = _context.next) {
                                          case 0:
                                                 _context.next = 2;
                                                 return ctrl.getByAluno(req, res);

                                          case 2:
                                                 R = _context.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context.stop();
                                   }
                            }
                     }, _callee, _this);
              }));

              return function (_x, _x2) {
                     return _ref.apply(this, arguments);
              };
       }());

       app.post('/projeto', function () {
              var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                   switch (_context2.prev = _context2.next) {
                                          case 0:
                                                 _context2.next = 2;
                                                 return ctrl.add(req, res);

                                          case 2:
                                                 R = _context2.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context2.stop();
                                   }
                            }
                     }, _callee2, _this);
              }));

              return function (_x3, _x4) {
                     return _ref2.apply(this, arguments);
              };
       }());

       app.put('/projeto', function () {
              var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                   switch (_context3.prev = _context3.next) {
                                          case 0:
                                                 _context3.next = 2;
                                                 return ctrl.save(req, res);

                                          case 2:
                                                 R = _context3.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context3.stop();
                                   }
                            }
                     }, _callee3, _this);
              }));

              return function (_x5, _x6) {
                     return _ref3.apply(this, arguments);
              };
       }());

       app.put('/projeto/addEtapa', function () {
              var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                   switch (_context4.prev = _context4.next) {
                                          case 0:
                                                 _context4.next = 2;
                                                 return ctrl.addEtapa(req, res);

                                          case 2:
                                                 R = _context4.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context4.stop();
                                   }
                            }
                     }, _callee4, _this);
              }));

              return function (_x7, _x8) {
                     return _ref4.apply(this, arguments);
              };
       }());

       app.post('/projeto/delEtapa', function () {
              var _ref5 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee5(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                   switch (_context5.prev = _context5.next) {
                                          case 0:
                                                 _context5.next = 2;
                                                 return ctrl.delEtapa(req, res);

                                          case 2:
                                                 R = _context5.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context5.stop();
                                   }
                            }
                     }, _callee5, _this);
              }));

              return function (_x9, _x10) {
                     return _ref5.apply(this, arguments);
              };
       }());

       app.post('/projeto/editarEtapa', function () {
              var _ref6 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee6(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee6$(_context6) {
                            while (1) {
                                   switch (_context6.prev = _context6.next) {
                                          case 0:
                                                 _context6.next = 2;
                                                 return ctrl.editarEtapa(req, res);

                                          case 2:
                                                 R = _context6.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context6.stop();
                                   }
                            }
                     }, _callee6, _this);
              }));

              return function (_x11, _x12) {
                     return _ref6.apply(this, arguments);
              };
       }());

       app.post('/projeto/enviarFeedback', function () {
              var _ref7 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee7(req, res) {
                     var R;
                     return regeneratorRuntime.wrap(function _callee7$(_context7) {
                            while (1) {
                                   switch (_context7.prev = _context7.next) {
                                          case 0:
                                                 _context7.next = 2;
                                                 return ctrl.enviarFeedback(req, res);

                                          case 2:
                                                 R = _context7.sent;

                                                 res.status(R.status).jsonp(R.data);

                                          case 4:
                                          case 'end':
                                                 return _context7.stop();
                                   }
                            }
                     }, _callee7, _this);
              }));

              return function (_x13, _x14) {
                     return _ref7.apply(this, arguments);
              };
       }());
};