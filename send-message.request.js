const request = require("request");
const querystring = require("querystring");
const { API_TOKEN } = require("./constants");

const sendMessage = ({ chat_id, text, disable_notification }) => {
  return new Promise((resolve, reject) => {
    const data = querystring.stringify({ chat_id, text, disable_notification });
    request(
      `https://api.telegram.org/bot${API_TOKEN}/sendMessage?${data}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve("Success!");
        }
      }
    );
  });
};

module.exports = sendMessage;
