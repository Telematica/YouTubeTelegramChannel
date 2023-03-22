const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log_status', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'log_status',
    timestamps: false,
    underscored: true
  });
};
