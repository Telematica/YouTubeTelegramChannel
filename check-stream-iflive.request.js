const request = require("request");
const { YOUTUBE_REQUEST_HEADERS } = require('./constants');

const checkIfLive = (channelId) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://www.youtube.com/channel/${channelId}`,
      headers: YOUTUBE_REQUEST_HEADERS,
    };
    request(options, (error, response, body) => {
      const success = !error && response.statusCode === 200;
      if (!success) {
        reject({error, code:response.statusCode});
      }
      const isLive = Boolean(body.match(/\d+ watching|LIVE NOW|PREMIERING NOW/gi));
      const match = body.match(/https:\/\/i\.ytimg\.com\/vi\/([A-Za-z0-9_@./#&+-]*)\/(hqdefault|hqdefault_live|maxresdefault)/i);
      const videoId = isLive && match
        ? match[1]
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
