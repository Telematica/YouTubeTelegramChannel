const { Sequelize, Transaction } = require("sequelize");
const { initModels } = require("./models/init-models");

/** @type {Sequelize} */
const sequelize = new Sequelize({
  dialect: "sqlite",
  isolationLevel: "SERIALIZABLE", // Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  logging: false,
  storage: __dirname + "/db.sqlite",
});
const models = initModels(sequelize);

/**
 * @function connect
 * @description Connects to the database and initializes the models.
 * @description This function will create the database tables if they do not exist.
 * @description It also authenticates the connection to ensure everything is set up correctly.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 * @throws {Error} If the connection fails.
 */
async function connect() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

module.exports = { connect, models, sequelize, dbDir: __dirname };
