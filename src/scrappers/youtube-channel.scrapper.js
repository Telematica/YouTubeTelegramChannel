const axios = require("axios").default;
const AxiosTypes = require("../@types/axios.types");
const YoutubeTypes = require("../@types/youtube.types");
const jsdom = require("jsdom");
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

    /** @type {boolean} */
    const isLive = /watch\?v=/.test(url?.href || "");

    if (!isLive) {
      return Promise.resolve({
        cid,
        live: isLive,
      });
    }

    /** @type {string=} */
    let rawScript = "";

    /** @type {string} */
    const scriptHint = "var ytInitialData = ";

    /** @type {NodeListOf<HTMLScriptElement>} */
    const pageScriptTags = dom.window.document.querySelectorAll("script");

    for (const scriptIndex in pageScriptTags) {
      const scriptTag =
        dom.window.document.querySelectorAll("script")[scriptIndex];
      if (scriptTag.textContent?.includes(scriptHint)) {
        rawScript =
          scriptTag.textContent?.replace(scriptHint, "").slice(0, -1) || "{}";
        break;
      }
    }

    /** @type {any} */
    const youtubeData = JSON.parse(rawScript);

    /** @type {string} */
    const liveSince =
      youtubeData.contents.twoColumnWatchNextResults.results.results.contents[0]
        .videoPrimaryInfoRenderer.dateText.simpleText;

    /** @type {number} */
    const viewCount = Number(
      youtubeData.contents.twoColumnWatchNextResults.results.results.contents[0]
        .videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.viewCount
        .runs[0].text
    );

    /** @type {string|null|undefined} */
    const title = dom.window.document
      .querySelector("meta[name=title]")
      ?.getAttribute("content");

    /** @type {string|undefined} */
    const vid = url?.href.match(/watch\?v=(.*)/)?.[1];

    // publishedTimeText

    /** @type {YoutubeTypes.YouTubeLiveDataType} */
    const data = {
      cid,
      vid,
      live: isLive,
      title,
      liveSince,
      viewCount,
    };
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = youtubeChannelScrapper;
