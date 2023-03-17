var DataTypes = require("sequelize").DataTypes;
var _channel = require("./channel");
var _live = require("./live");
var _log_entry = require("./log-entry");

function initModels(sequelize) {
  var channel = _channel(sequelize, DataTypes);
  var live = _live(sequelize, DataTypes);
  var log_entry = _log_entry(sequelize, DataTypes);

  live.belongsTo(channel, { foreignKey: "channel_id"});
  channel.hasMany(live, { foreignKey: "channel_id"});

  return {
    channel,
    live,
    log_entry,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
