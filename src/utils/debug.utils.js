// @ts-check

/**
 * @description Display Debug Info in the Console
 * @param {NodeJS.ProcessEnv} env
 * @returns {void}
 */
function showDebugInfo(env) {
  const { API_TOKEN, TZ, TELEGRAM_CHANNEL_OR_GROUP } = env;
  console.table({
    "Telegram Token": API_TOKEN,
    TimeZone: TZ,
    "Server DateTime": new Date().toDateString(),
    "Server Locale Time": new Date().toLocaleTimeString(),
    "Telegram Channel/Group": TELEGRAM_CHANNEL_OR_GROUP,
  });
}

module.exports = { showDebugInfo };
