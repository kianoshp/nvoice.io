var passport 			= require('passport')
	, LocalStrategy		= require('passport-local').Strategy
	, User				= require('../model/user');


var userSchema = new User();
passport.use(new LocalStrategy(
	{
		usernameField: 'email'
		, passwordField: 'password'
	},
  	function(username, password, done) {
    	User.findOne({ email: username }, function(err, user) {
      		if (err) { return done(err); }
      		if (!user) {
        		return done(null, false, { message: 'Incorrect username.' });
      		}
      		if (!user.comparePassword(password)) {
        		return done(null, false, { message: 'Incorrect password.' });
      		}
      		return done(null, user);
    	});
  	})
);

