const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('live', {
    vid: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    channel_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'channel',
        key: 'id'
      }
    },
    live: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    scheduled_start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    actual_start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    live_since: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'live',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "sqlite_autoindex_live_1",
        unique: true,
        fields: [
          { name: "vid" },
        ]
      },
    ]
  });
};
