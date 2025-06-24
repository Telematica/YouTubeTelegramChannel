// @ts-check
require("dotenv").config({ path: __dirname + "/../../.env" });
const YoutubeTypes = require("../@types/youtube.types");
const youtubeChannelScrapper = require("../scrappers/youtube/youtube-channel-info.scrapper");

/**
 * @function
 * @description YouTube Profile Info Bot
 * @returns {Promise<void | YoutubeTypes.YouTubeChannelInfoType>}
 * @throws {Error} If the channel is not found or if there is a bad request
 */
const getYouTubeProfileInfo = async () => {
  try {
    const [, , ...rest] = process.argv;
    const channelIndex = rest.indexOf("--channel");

    if (channelIndex === -1) {
      console.error("Missing channel input.");
      return;
    }

    const channel = rest[channelIndex + 1];
    const data = await youtubeChannelScrapper(channel);
    return data;
  } catch (/** @type {any} */ e) {
    console.error("Unexpected Error (maybe 500):", e.message);
    throw e;
  }
};

// istanbul ignore next
if (process.argv.indexOf("--channel") > -1) {
  (async () => {
    try {
      console.log(await getYouTubeProfileInfo());
    } catch (/** @type {any} */ e) {
      console.error("Unexpected Error (maybe 500):", e.message);
    }
  })();
}

module.exports = { getYouTubeProfileInfo };
