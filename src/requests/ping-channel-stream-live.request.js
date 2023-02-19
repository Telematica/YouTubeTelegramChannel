// @ts-check
const axios = require("axios").default;
const {
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_LIVE_HEADERS,
} = require("../constants/youtube.constants");

/**
 * Verifies if a channel is live
 *
 * @param {string} channelId Channel Id
 * @returns {Promise<import("axios").AxiosResponse<any, any> | import("axios").AxiosError<any, any>>}
 */
const pingChannelStreamLive = async (channelId) => {
  /** @type {string} */
  const url = `${YOUTUBE_CHANNEL_URL}/${channelId}/live`;

  /** @type {import("axios").AxiosRequestConfig<any>} */
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
