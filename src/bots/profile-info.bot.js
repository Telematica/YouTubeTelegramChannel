// @ts-check
require("dotenv").config({ path: __dirname + "/../../.env" });

const youtubeChannelScrapper = require("../scrappers/youtube/youtube-channel-info.scrapper");

/**
 * @function
 * @description Main Function IIFE
 * @returns {void}
 */
(async () => {
  try {
    const [binPath, scriptPath, ...rest] = process.argv;
    const channelIndex = rest.indexOf('--channel');

    if (channelIndex === -1) {
      console.log("Missing channel input.");
      return;
    }

    const channel = channelIndex > -1 ? rest[channelIndex + 1] : "";

    const data = await youtubeChannelScrapper(channel);
    console.log(data);
    return data;
  } catch (/** @type {any} */ e) {
    if (e.code === "ERR_BAD_REQUEST") {
      console.log("Channel Not Found (404) or Bad Request (400).");
    } else {
      console.log("Unexpected Error (maybe 500):", e.code, e.message);
    }
  }
})();
