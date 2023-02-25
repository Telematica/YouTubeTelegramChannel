// @ts-check
/**
 * Display Debug Info in the Console
 *
 * @returns void
 */
function showDebugInfo() {
  console.table(
    {
      "Telegram Token": process.env.API_TOKEN,
      TimeZone: process.env.TZ,
      "Server DateTime": new Date().toDateString(),
      "Server Locale Time": new Date().toLocaleTimeString(),
    },
    ["Logged Server Attribute", "Value"]
  );
}

module.exports = { showDebugInfo };
