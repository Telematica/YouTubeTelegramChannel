const axios = require("axios").default;
const jsdom = require("jsdom");
const AxiosTypes = require("../../@types/axios.types");
const YoutubeTypes = require("../../@types/youtube.types");
const homePageRequest = require("../../requests/services/youtube/home-page.request");

/* global NodeListOf:readonly, HTMLScriptElement:readonly, HTMLLinkElement:readonly */

/**
 * Verifies if a channel is live
 *
 * @param {string} cid Channel Id
 * @returns {Promise<YoutubeTypes.YouTubeChannelInfoType>} YouTube Data
 */
const youtubeChannelInfoScrapper = async (cid) => {
  try {
    /** @type {AxiosTypes.AxiosResponse} */
    const response = await homePageRequest(cid);

    if (response instanceof axios.AxiosError) {
      throw new Error(response.message);
    }

    /** @type {jsdom.JSDOM} */
    const dom = new jsdom.JSDOM(response.data);

    /** @type {HTMLLinkElement|null} */
    const url = dom.window.document.querySelector("link[rel=canonical]");

    /** @type {HTMLMetaElement|null} */
    const title = dom.window.document.querySelector("meta[property='og:title']");

    /** @type {string=} */
    let ytInitialDataRawScript = "";

    /** @type {string} */
    const ytInitialData = "var ytInitialData = ";

    /** @type {NodeListOf<HTMLScriptElement>} */
    const pageScriptTags = dom.window.document.querySelectorAll("script");

    for (const scriptIndex in pageScriptTags) {
      const scriptTag =
        dom.window.document.querySelectorAll("script")[scriptIndex];
      if (scriptTag.textContent?.includes(ytInitialData)) {
        ytInitialDataRawScript = scriptTag.textContent
          ?.replace(ytInitialData, "")
          .slice(0, -1);
        continue;
      }
    }

    /** @type {any} */
    const youtubeData = JSON.parse(ytInitialDataRawScript);

    /** @type {string|null|undefined} */
    const vanityUrl =
      youtubeData.metadata &&
      youtubeData.metadata.channelMetadataRenderer &&
      youtubeData.metadata.channelMetadataRenderer.vanityChannelUrl
        ? youtubeData.metadata.channelMetadataRenderer.vanityChannelUrl
        : "";

    /** @type {YoutubeTypes.YouTubeChannelInfoType} */
    const data = {
      canonical: url?.href || "",
      title: title?.content || "",
      vanityUrl,
    };
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = youtubeChannelInfoScrapper;
