// @ts-check
const axios = require("axios").default;
const Axios = require("../@types/axios.types");
const {
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_LIVE_HEADERS,
} = require("../constants/youtube.constants");

/**
 * Verifies if a channel is live
 *
 * @param {string} channelId Channel Id
 * @returns {Promise<Axios.AxiosResponse>}
 */
const pingChannelStreamLive = async (channelId) => {
  /** @type {string} */
  const url = `${YOUTUBE_CHANNEL_URL}/${channelId}/live`;

  /** @type {AxiosTypes.AxiosRequestConfig} */
  const config = {
    headers: YOUTUBE_LIVE_HEADERS,
  };

  try {
    return await axios.get(url, config);
  } catch (error) {
    return Promise.reject(
      error instanceof axios.AxiosError ? error.message : error
    );
  }
};

module.exports = pingChannelStreamLive;
