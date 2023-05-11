const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channel', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    vanity: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    disable_notification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'channel',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "sqlite_autoindex_channel_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
