const { Sequelize } = require("sequelize");

// Init the DB Connection
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Load User model
require("./User.model")(sequelize);

module.exports = sequelize;
