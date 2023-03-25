const { Sequelize, Transaction } = require('sequelize');
const { initModels } = require("./models/init-models");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  logging: false,
  storage: __dirname + "/db.sqlite",
});
const models = initModels(sequelize);
async function connect() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
}

module.exports = { connect, models, sequelize };
