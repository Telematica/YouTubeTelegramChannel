//@ts-check
const axios = require("axios").default;
const Axios = require("axios");
const fs = require("fs");
const path = require("path");
const youtubeChannelInfoScrapper = require("../../../src/scrappers/youtube/youtube-channel-info.scrapper");

jest.mock("axios");

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

describe("youtubeChannelInfoScrapper Scrapping Script", () => {
  test("Successfully Scraps YouTube Channel data from a valid channel ID", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../src/mock/youtube/yt-channel-home.html"),
      "utf8"
    );

    /** @type {Axios.AxiosResponse} */
    const mockAxiosResponse = {
      data: html,
      status: 200,
      statusText: "success",
      headers: {},
      config: {
        // @ts-ignore
        headers: {},
      },
    };
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(mockAxiosResponse));
    const response = await youtubeChannelInfoScrapper(
      "UCJ0-OtVpF0wOKEqT2Z1HEtA"
    );
    const expectedData = {
      canonical: "https://www.youtube.com/channel/UCJ0-OtVpF0wOKEqT2Z1HEtA",
      title: "ElectroBOOM",
      vanityUrl: "http://www.youtube.com/@ElectroBOOM",
    };
    expect(response).toEqual(expectedData);
  });

  test("Successfully Scraps YouTube Channel data from a valid channel ID without Vanity URL", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../src/mock/youtube/yt-channel-home.html"),
      "utf8"
    ).replace(/\,"vanityChannelUrl"\:"http\:\/\/www\.youtube\.com\/@ElectroBOOM"/g, '');

    /** @type {Axios.AxiosResponse} */
    const mockAxiosResponse = {
      data: html,
      status: 200,
      statusText: "success",
      headers: {},
      config: {
        // @ts-ignore
        headers: {},
      },
    };
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(mockAxiosResponse));
    const response = await youtubeChannelInfoScrapper(
      "UCJ0-OtVpF0wOKEqT2Z1HEtA"
    );
    const expectedData = {
      canonical: "https://www.youtube.com/channel/UCJ0-OtVpF0wOKEqT2Z1HEtA",
      title: "ElectroBOOM",
      vanityUrl: "",
    };
    expect(response).toEqual(expectedData);
  });

  test("Throws an Error on a Server Error", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../src/mock/youtube/yt-channel-home.html"),
      "utf8"
    );
    /** @type {Axios.AxiosError} */
    const mockAxiosResponse = new Axios.AxiosError();
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(mockAxiosResponse));
    try {
      const response = await youtubeChannelInfoScrapper("UCJ0-OtVpF0wOKEqT2Z1HEtA");
    } catch (/** @type {unknown} */ e) {
      expect(String(e)).toEqual("Error");
    }
  });
});
