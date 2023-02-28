const axios = require("axios").default;
const jsdom = require("jsdom");
const AxiosTypes = require("../@types/axios.types");
const YoutubeTypes = require("../@types/youtube.types");
const pingChannelStreamLive = require("../requests/ping-channel-stream-live.request");

/* global NodeListOf:readonly, HTMLScriptElement:readonly, HTMLLinkElement:readonly */

/**
 * Verifies if a channel is live
 *
 * @param {string} cid Channel Id
 * @returns {Promise<YoutubeTypes.YouTubeLiveDataType>} YouTube Data
 */
const youtubeChannelScrapper = async (cid) => {
  try {
    /** @type {AxiosTypes.AxiosResponse} */
    const response = await pingChannelStreamLive(cid);

    if (response instanceof axios.AxiosError) {
      throw new Error(response.message);
    }

    /** @type {jsdom.JSDOM} */
    const dom = new jsdom.JSDOM(response.data);

    /** @type {HTMLLinkElement|null} */
    const url = dom.window.document.querySelector("link[rel=canonical]");

    /** @type {string=} */
    let ytInitialDataRawScript = "";

    /** @type {string=} */
    let ytInitialPlayerResponseRawScript = "{}";

    /** @type {string} */
    const ytInitialData = "var ytInitialData = ";

    /** @type {string} */
    const ytInitialPlayerResponse = "var ytInitialPlayerResponse = ";

    /** @type {NodeListOf<HTMLScriptElement>} */
    const pageScriptTags = dom.window.document.querySelectorAll("script");

    for (const scriptIndex in pageScriptTags) {
      const scriptTag =
        dom.window.document.querySelectorAll("script")[scriptIndex];
      if (scriptTag.textContent?.includes(ytInitialData)) {
        ytInitialDataRawScript =
          scriptTag.textContent?.replace(ytInitialData, "").slice(0, -1) || "{}";
        continue;
      }

      if (scriptTag.textContent?.includes(ytInitialPlayerResponse)) {
        ytInitialPlayerResponseRawScript =
          scriptTag.textContent?.replace(ytInitialPlayerResponse, "").replace(/;var meta.*/, "") || "{}";
        continue;
      }
    }

    /** @type {any} */
    const youtubeData = JSON.parse(ytInitialDataRawScript);

    /** @type {any} */
    const playerResponse = JSON.parse(ytInitialPlayerResponseRawScript);

    /** @type {string|null|undefined} */
    const title = dom.window.document
      .querySelector("meta[name=title]")
      ?.getAttribute("content");

    /** @type {string|undefined} */
    const vid = url?.href.match(/watch\?v=(.*)/)?.[1];

    /** @type {boolean} */
    const live = /watch\?v=/.test(url?.href || "") && playerResponse.playabilityStatus && playerResponse.playabilityStatus.status === "OK";

    if (!live) {
      const scheduledStartTime = playerResponse.playabilityStatus && playerResponse.playabilityStatus.status === "LIVE_STREAM_OFFLINE"
        ? playerResponse.playabilityStatus.liveStreamability.liveStreamabilityRenderer.offlineSlate.liveStreamOfflineSlateRenderer.scheduledStartTime
        : 0;
      return Promise.resolve({
        cid,
        live,
        scheduledStartTime
      });
    }

    /** @type {string} */
    const liveSince = youtubeData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText;

    /** @type {number} */
    const viewCount = youtubeData.contents.twoColumnWatchNextResults.results.results.contents[0]
      .videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.viewCount
      .runs[0].text;

    // publishedTimeText

    /** @type {YoutubeTypes.YouTubeLiveDataType} */
    const data = {
      cid,
      live,
      liveSince,
      title,
      vid,
      viewCount: isFinite(viewCount) ? Number(viewCount) : 0,
    };
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = youtubeChannelScrapper;
