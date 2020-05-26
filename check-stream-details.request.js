const request = require("request");
const { YOUTUBE_REQUEST_HEADERS } = require('./constants');

const checkStreamDetails = (streamId) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://www.youtube.com/watch?v=${streamId}`,
      headers: YOUTUBE_REQUEST_HEADERS,
    };
    request(options, (error, response, body) => {
      const success = !error && response.statusCode == 200;
      if (!success) {
        reject("Request error!");
        return;
      }
      const isLive = Boolean(body.match(/LIVE NOW/gi));
      const date = isLive ? body.match(/"startTimestamp":"+([A-Za-z0-9_@.:/#&+-]*)+"/i)[1] : null;
      const time = isLive
        ? new Date(
          new Date(
            body.match(/"startTimestamp":"+([A-Za-z0-9_@.:/#&+-]*)+"/i)[1])
        ).toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' })
        : null;
      console.log({
        isLive,
        success,
        time,
        date
      });
      resolve({
        isLive,
        success,
        time,
        date
      });
    });
  });
};

module.exports = checkStreamDetails;
