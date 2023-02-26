// @ts-check

/**
 * @description Display Debug Info in the Console
 * @param {NodeJS.Process} pro
 * @returns {void}
 */
function showDebugInfo(pro) {
  const { API_TOKEN, TZ } = pro.env;
  console.table(
    {
      "Telegram Token": API_TOKEN,
      TimeZone: TZ,
      "Server DateTime": new Date().toDateString(),
      "Server Locale Time": new Date().toLocaleTimeString(),
    },
  );
}

module.exports = { showDebugInfo };
