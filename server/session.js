const sequelize = require("./sequelize");
const expressSession = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize");

const session = expressSession({
  store: new (connectSessionSequelize(expressSession.Store))({
    db: sequelize,
  }),
  secret: process.env.SESSION_SECRET || "YOLO",
  saveUninitialized: false,
  resave: false,
});

module.exports = session;
