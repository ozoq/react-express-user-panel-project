require("dotenv").config();

const app = require("./server/app");
const sequelize = require("./server/sequelize");

const PORT = process.env.PORT || 8080;

// https://github.com/sequelize/express-example/blob/master/express-main-example/index.js
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

init();
