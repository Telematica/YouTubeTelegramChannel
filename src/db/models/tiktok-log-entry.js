const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiktok_log_entry', {
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
    },
    tiktok_user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'tiktok_user',
        key: 'id'
      }
    }
  }, {
    tableName: 'tiktok_log_entry',
    timestamps: true,
    paranoid: true,
    underscored: true
  });
};
