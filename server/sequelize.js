const { Sequelize } = require("sequelize");

// Some copypasta to make sequilize work with Heroku Postgres
// https://bootcamp.rocketacademy.co/4-backend-structure/4.1-orm-sequelize/4.1.10-deploy-sequelize-app-to-heroku
const url = require("url");
let sequelize;
console.log(
  "Node env: ",
  process.env.NODE_ENV,
  process.env.NODE_ENV === "production"
);
if (process.env.NODE_ENV === "production") {
  const config = {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(":"));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(":") + 1,
    dbUrl.auth.length
  );
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL);
}

require("./User.model")(sequelize);

module.exports = sequelize;
