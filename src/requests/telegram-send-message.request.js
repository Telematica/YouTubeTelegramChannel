// @ts-check
const axios = require("axios").default;
const querystring = require("querystring");
const { API_TOKEN, TELEGRAM_API_URL } = require("../constants/app.constants");

/**
 * Verifies if a channel is live
 *
 * @param {SendMessageRequest} Send Message Params
 * @returns {Promise<import("@grammyjs/types").Message>}
 */
const telegramSendMessage = async ({ chat_id, text }) => {
  /** @type {string} */
  const data = querystring.stringify({ chat_id, text });

  /** @type {string} */
  const url = `${TELEGRAM_API_URL}${API_TOKEN}/sendMessage?${data}`;

  try {
    return await axios.get(url);
  } catch (error) {
    return Promise.reject(
      error instanceof axios.AxiosError ? error.message : error
    );
  }
};

module.exports = telegramSendMessage;
