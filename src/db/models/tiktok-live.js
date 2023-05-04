const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiktok_live', {
    room_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    tiktok_user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'tiktok_user',
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
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    live_since: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tiktok_live',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "sqlite_autoindex_tiktok_live_1",
        unique: true,
        fields: [
          { name: "room_id" },
        ]
      },
    ]
  });
};
