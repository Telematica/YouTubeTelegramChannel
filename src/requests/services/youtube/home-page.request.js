// @ts-check
const axios = require("axios").default;
const Axios = require("../../../@types/axios.types");
const {
  YOUTUBE_URL,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_LIVE_HEADERS,
} = require("../../../constants/youtube.constants");

/**
 * Verifies if a channel is live
 *
 * @param {string} channelId Channel Id
 * @returns {Promise<Axios.AxiosResponse>} Axios Response
 */
const homePageRequest = async (channelId) => {
  /** @type {string} */
  const url = channelId.startsWith("@") ? `${YOUTUBE_URL}/${channelId}` : `${YOUTUBE_CHANNEL_URL}/${channelId}`;

  /** @type {Axios.AxiosRequestConfig} */
  const config = {
    headers: YOUTUBE_LIVE_HEADERS,
  };

  try {
    return await axios.get(url, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = homePageRequest;
