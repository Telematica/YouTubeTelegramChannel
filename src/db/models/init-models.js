var DataTypes = require("sequelize").DataTypes;
var _channel = require("./channel");
var _live = require("./live");
var _log_entry = require("./log-entry");
var _log_status = require("./log-status");

function initModels(sequelize) {
  var channel = _channel(sequelize, DataTypes);
  var live = _live(sequelize, DataTypes);
  var log_entry = _log_entry(sequelize, DataTypes);
  var log_status = _log_status(sequelize, DataTypes);

  live.belongsTo(channel, { as: "channel", foreignKey: "channel_id"});
  channel.hasMany(live, { as: "lives", foreignKey: "channel_id"});
  log_entry.belongsTo(channel, { as: "channel", foreignKey: "channel_id"});
  channel.hasMany(log_entry, { as: "log_entries", foreignKey: "channel_id"});
  log_entry.belongsTo(log_status, { as: "log_status", foreignKey: "log_status_id"});
  log_status.hasMany(log_entry, { as: "log_entries", foreignKey: "log_status_id"});

  return {
    channel,
    live,
    log_entry,
    log_status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
