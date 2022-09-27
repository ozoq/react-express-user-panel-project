const { authorized } = require("./helpers");
const passport = require("./passport");
const { User } = require("./sequelize").models;
const router = require("express").Router();

/**
 * This is a "good" error, everything is working fine, user did something wrong
 */
function handlePassportInfo(res, info) {
  res.failure(info.message);
}

/**
 * This is an unpredicted error that shouldn't be shown to the client as it is
 */
function handlePassportError(res, error) {
  console.log(error);
  res.failure();
}

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (info) {
      return handlePassportInfo(res, info);
    }
    if (error || !user) {
      return handlePassportError(res, error);
    }
    req.login(user, (error) => {
      if (error) {
        handlePassportError(res, error);
      }
      res.success(`Logged in as ${req.user.name}`);
    });
  })(req, res, next);
});

router.post("/logout", (req, res) =>
  req.logout((error) => {
    if (error) {
      return handlePassportError(res, error);
    }
    res.success("Logged out");
  })
);

router.post("/register", (req, res) =>
  User.register(req.body, {
    onSuccess(user) {
      req.login(user, (error) => {
        if (error) {
          return handlePassportError(res, error);
        }
        res.success(`Registered as ${req.user.email} (${req.user.name})`);
      });
    },
    onError(error) {
      res.failure(error);
    },
  })
);

router.post("/status", authorized, (req, res) => {
  res.success(`Logged in as ${req.user.email} (${req.user.name})`, {
    user: req.user.getSafe(),
  });
});

module.exports = router;
