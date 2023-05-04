var DataTypes = require("sequelize").DataTypes;
var _channel = require("./channel");
var _live = require("./live");
var _log_entry = require("./log-entry");
var _log_status = require("./log-status");
var _tiktok_live = require("./tiktok-live");
var _tiktok_log_entry = require("./tiktok-log-entry");
var _tiktok_user = require("./tiktok-user");

function initModels(sequelize) {
  var channel = _channel(sequelize, DataTypes);
  var live = _live(sequelize, DataTypes);
  var log_entry = _log_entry(sequelize, DataTypes);
  var log_status = _log_status(sequelize, DataTypes);
  var tiktok_live = _tiktok_live(sequelize, DataTypes);
  var tiktok_log_entry = _tiktok_log_entry(sequelize, DataTypes);
  var tiktok_user = _tiktok_user(sequelize, DataTypes);

  live.belongsTo(channel, { as: "channel", foreignKey: "channel_id"});
  channel.hasMany(live, { as: "lives", foreignKey: "channel_id"});
  log_entry.belongsTo(channel, { as: "channel", foreignKey: "channel_id"});
  channel.hasMany(log_entry, { as: "log_entries", foreignKey: "channel_id"});
  log_entry.belongsTo(log_status, { as: "log_status", foreignKey: "log_status_id"});
  log_status.hasMany(log_entry, { as: "log_entries", foreignKey: "log_status_id"});
  tiktok_log_entry.belongsTo(log_status, { as: "log_status", foreignKey: "log_status_id"});
  log_status.hasMany(tiktok_log_entry, { as: "tiktok_log_entries", foreignKey: "log_status_id"});
  tiktok_live.belongsTo(tiktok_user, { as: "tiktok_user", foreignKey: "tiktok_user_id"});
  tiktok_user.hasMany(tiktok_live, { as: "tiktok_lives", foreignKey: "tiktok_user_id"});
  tiktok_log_entry.belongsTo(tiktok_user, { as: "tiktok_user", foreignKey: "tiktok_user_id"});
  tiktok_user.hasMany(tiktok_log_entry, { as: "tiktok_log_entries", foreignKey: "tiktok_user_id"});

  return {
    channel,
    live,
    log_entry,
    log_status,
    tiktok_live,
    tiktok_log_entry,
    tiktok_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
