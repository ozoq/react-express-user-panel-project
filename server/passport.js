const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./sequelize").models;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.verifyPassword(password))) {
        return done(null, null, {
          message: "Email or password is not correct",
        });
      }
      if (user.isBlocked) {
        return done(null, null, {
          message: "Your account was blocked",
        });
      }
      done(null, user);
    }
  )
);

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      // Dirty way of returning the null to fix a problem in Passport.js:
      // https://stackoverflow.com/questions/71766957/delete-the-session-of-a-logged-in-user-which-is-later-deleted-by-the-admin
      return done(null, null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.serializeUser((user, done) => done(null, user.id));

module.exports = passport;
