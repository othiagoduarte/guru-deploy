var passport = require("passport");
var passportJWT = require("passport-jwt");
var cfg = { jwtSecret: "secret",jwtSession: {session: true}};
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

var User = require('../models/user.js')();
  
module.exports = function(app) {
  
  
  var strategy = new Strategy(params, function(payload, done) {

    User.findOne({_id:payload.id})
    .then(function(users){
      return done(null, {id: users.id});
    },
    function(erro){
      return done(null, null);
    });
  });
  
  passport.use(strategy);

  passport.serializeUser(function( user, done ) {
    done( null, user.id);
  });

  passport.deserializeUser(function( user, done ) {
    done( null, user );
  });
  
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticateN: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    },

    authenticate: function() {
      return function(req,res,next){next();}
    }


  };
};