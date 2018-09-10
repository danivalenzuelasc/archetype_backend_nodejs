// Declare dependencies
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const settings = require('./settings');

// Setting options
const options = {
  ignoreExpiration: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: settings.jwt,
};

// Define methods
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.use(new Strategy(options, (jwtPayload, done) => {
  done(null, jwtPayload);
}));

// Export passport
module.exports = passport;
