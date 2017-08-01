var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');

module.exports = function()
{
    
    passport.isAuth = function(req, res, next) {
	  return next();
	  if (req.isAuthenticated()) {
			return next();
		} else {
			res.status('401').json('Não autorizado');
		}
	}
    
    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });	

    return  passport;
}
