const request = require("request");
const { YOUTUBE_REQUEST_HEADERS } = require('./constants');

const checkIfLive = (channelId) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://www.youtube.com/channel/${channelId}`,
      headers: YOUTUBE_REQUEST_HEADERS,
    };
    request(options, (error, response, body) => {
      const success = !error && response.statusCode == 200;
      if (!success) {
        reject("Request error!");
        return;
      }
      const isLive = Boolean(body.match(/LIVE NOW|PREMIERING NOW/gi));
      const videoId = isLive
        ? body.match(/https:\/\/i\.ytimg\.com\/vi\/([A-Za-z0-9_@./#&+-]*)\/(hqdefault_live|maxresdefault)/i)[1]
        : null;
      resolve({
        isLive,
        success,
        videoId,
      });
    });
  });
}

module.exports = checkIfLive;
