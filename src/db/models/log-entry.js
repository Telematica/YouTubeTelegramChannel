const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log_entry', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    log_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'log_status',
        key: 'id'
      }
    }
  }, {
    tableName: 'log_entry',
    timestamps: true,
    paranoid: true,
    underscored: true
  });
};
