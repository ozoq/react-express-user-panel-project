const express = require("express");
const path = require("path");
const passport = require("./passport");
const helpers = require("./helpers");

const app = express();

app.use(express.json());
app.use((_, res, next) => {
  res.success = helpers.respondWithStatusJson("success")(res);
  res.failure = helpers.respondWithStatusJson("failure")(res);
  next();
});

app.use(require("./session"));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "../dist")));
app.use("/api/auth", require("./auth"));
app.use("/api/panel", require("./panel"));

app.use(helpers.handleSyntaxErrors);

module.exports = app;
