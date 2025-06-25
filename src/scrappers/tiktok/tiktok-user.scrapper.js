const axios = require("axios").default;
const jsdom = require("jsdom");
const AxiosTypes = require("../../@types/axios.types");
const TikTokTypes = require("../../@types/tiktok.types");
const { TIKTOK_LIVE_STATUSES } = require("../../constants/tiktok.constants");
const pingUserStreamLive = require("../../requests/services/tiktok/ping-user-stream-live.request");

/* global NodeListOf:readonly, HTMLScriptElement:readonly, HTMLLinkElement:readonly */

/**
 * Verifies if a channel is live
 * https://tikapi.io/documentation/#tag/Live/operation/user.live.chat
 * https://tikapi.io/documentation/#tag/Live/operation/user.live.stats
 *
 * @param {string} uniqueId Unique Id
 * @returns {Promise<TikTokTypes.TikTokLiveDataType>} TikTok Data
 */
const tiktokUserScrapper = async (uniqueId) => {
  try {
    /** @type {AxiosTypes.AxiosResponse} */
    const response = await pingUserStreamLive(uniqueId);

    if (response instanceof axios.AxiosError) {
      throw new Error(response.message);
    }

    /** @type {jsdom.JSDOM} */
    const dom = new jsdom.JSDOM(response.data);

    /** @type {HTMLElement|null} */
    const script = dom.window.document.getElementById(
      "__UNIVERSAL_DATA_FOR_REHYDRATION__"
    );

    /** @type {any} */
    const tiktokData = JSON.parse(String(script?.textContent));

    /** @type {boolean} */
    const live = Boolean(
      tiktokData.__DEFAULT_SCOPE__ &&
        tiktokData.__DEFAULT_SCOPE__["webapp.user-detail"] &&
        tiktokData.__DEFAULT_SCOPE__["webapp.user-detail"]?.userInfo &&
        tiktokData.__DEFAULT_SCOPE__["webapp.user-detail"]?.userInfo?.user &&
        tiktokData.__DEFAULT_SCOPE__["webapp.user-detail"]?.userInfo?.user
          ?.roomId
    );

    if (!live) {
      return Promise.resolve({
        uniqueId,
        live,
      });
    }

    // /** @type {string|null|undefined} */
    // const title = dom.window.document
    //   .querySelector("meta[name='description']")
    //   ?.attributes.getNamedItem("content")?.value;

    // /** @type {number} */
    // const liveSince = tiktokData.LiveRoom.liveRoomUserInfo.liveRoom.startTime;

    // /** @type {number} */
    // const viewCount =
    //   tiktokData.LiveRoom.liveRoomUserInfo.liveRoom.liveRoomStats.userCount;

    // /** @type {string} */
    // const roomId = tiktokData.LiveRoom.liveRoomUserInfo.user.roomId;

    /** @type {string} */
    const roomId =
      tiktokData.__DEFAULT_SCOPE__["webapp.user-detail"]?.userInfo?.user
        ?.roomId;

    /** @type {TikTokTypes.TikTokLiveDataType} */
    const data = {
      uniqueId,
      roomId,
      live,
      liveSince: undefined,
      title: "(NO TITLE)",
      viewCount: 0,
    };
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = tiktokUserScrapper;
