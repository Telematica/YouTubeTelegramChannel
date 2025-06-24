const axios = require("axios").default;
const jsdom = require("jsdom");
const AxiosTypes = require("../@types/axios.types");
const YoutubeTypes = require("../@types/youtube.types");
const homePageRequest = require("../requests/services/youtube/home-page.request");

/* global NodeListOf:readonly, HTMLScriptElement:readonly, HTMLLinkElement:readonly */

/**
 * Verifies if a channel is live
 *
 * @param {string} cid Channel Id
 * @returns {Promise<void>} YouTube Data
 */
const youtubeChannelScrapper = async (cid) => {
  // @todo: Implement scrapping logic for YouTube channel home page
};

module.exports = youtubeChannelScrapper;
