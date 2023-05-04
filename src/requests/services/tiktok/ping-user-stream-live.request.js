// @ts-check
const axios = require("axios").default;
const Axios = require("../../../@types/axios.types");
const {
  TIKTOK_URL,
  TIKTOK_LIVE_HEADERS,
} = require("../../../constants/tiktok.constants");

/**
 * Verifies if a channel is live
 *
 * @param {string} channelId Channel Id
 * @returns {Promise<Axios.AxiosResponse>} Axios Response
 */
const pingUserStreamLive = async (channelId) => {
  /** @type {string} */
  const url = `${TIKTOK_URL}/${channelId}/live`;

  /** @type {Axios.AxiosRequestConfig} */
  const config = {
    headers: TIKTOK_LIVE_HEADERS,
  };

  try {
    return await axios.get(url, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = pingUserStreamLive;
