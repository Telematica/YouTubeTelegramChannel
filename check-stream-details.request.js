const request = require("request");
const { YOUTUBE_REQUEST_HEADERS } = require('./constants');

const checkStreamDetails = (streamId) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://www.youtube.com/watch?v=${streamId}`,
      headers: YOUTUBE_REQUEST_HEADERS,
    };
    request(options, (error, response, body) => {
      const success = !error && response.statusCode === 200;
      if (!success) {
        reject({error, code: response.statusCode});
      }
      const isLive = Boolean(body.match(/LIVE NOW/gi));
      const timestamp = isLive ? body.match(/"startTimestamp":"+([A-Za-z0-9_@.:/#&+-]*)+"/i) : null;
      const date = isLive && timestamp ? timestamp[1] : null;
      const time = isLive  && timestamp
        ? new Date(new Date(date)).toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' })
        : `${new Date().toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' })} (*)`;
      const viewers = isLive 
        ? body.match(/"text":"([0-9,]+)+.*"/i)[1]
        : '(?)';
      resolve({
        isLive,
        success,
        time,
        date,
        viewers
      });
    });
  });
};

module.exports = checkStreamDetails;
