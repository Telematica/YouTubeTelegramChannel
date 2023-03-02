// @ts-check
const axios = require("axios").default;
const grammyjs = require("@grammyjs/types");
const TelegramTypes = require("../@types/telegram.types");
const querystring = require("querystring");
const { API_TOKEN, TELEGRAM_API_URL } = require("../constants/app.constants");

/**
 * @description Verifies if a channel is live
 * @param {TelegramTypes.SendMessageRequest} Send Message Params
 * @returns {Promise<grammyjs.Message>} Telegram Message response
 */
const telegramSendMessage = async ({ chat_id, text, disable_notification }) => {
  /** @type {string} */
  const params = querystring.stringify({ chat_id, text, disable_notification });

  /** @type {string} */
  const url = `${TELEGRAM_API_URL}${API_TOKEN}/sendMessage?${params}`;

  try {
    return await axios.get(url);
  } catch (error) {
    return Promise.reject(
      error instanceof axios.AxiosError ? error.message : error
    );
  }
};

module.exports = telegramSendMessage;
