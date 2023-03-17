const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log_entry', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'log_entry',
    timestamps: true,
    paranoid: true,
    underscored: true
  });
};
