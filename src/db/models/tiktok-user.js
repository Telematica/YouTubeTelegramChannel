const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiktok_user', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    nickname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    unique_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tiktok_user',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "sqlite_autoindex_tiktok_user_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
