//@ts-check
const axios = require("axios").default;
const Axios = require("axios");
const fs = require("fs");
const path = require("path");
const youtubeChannelScrapper = require("../../src/scrappers/youtube-channel.scrapper");

jest.mock("axios");

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

describe("youtubeChannelScrapper Scrapping Script", () => {
  test("Successfully Scraps YouTube Live data when a transmission is ongoing", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../src/mock/html/stream.mock.html"),
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
    const response = await youtubeChannelScrapper("UCPqrEgBEHVj4vDITrClNQIw");
    const expectedData = {
      cid: "UCPqrEgBEHVj4vDITrClNQIw",
      live: true,
      liveSince: "Comenzó a transmitir el 10 nov 2022",
      title:
        "American English Listening Practice Level 1 - English Listening Comprehension",
      vid: "F8gbJUXaeo0",
      viewCount: 132,
    };
    expect(response).toEqual(expectedData);
  });

  test("Successfully Scraps YouTube Live data when a transmission is ongoing but there is no way to determine since when is live and if it has active viewers", async () => {
    const html = fs
      .readFileSync(
        path.resolve(__dirname, "../../src/mock/html/stream.mock.html"),
        "utf8"
      )
      .replace(/"simpleText": "Comenzó a transmitir el 10 nov 2022"/g, "")
      .replace(
        /"runs": \[\{ "text": "132" \}\, \{ "text": "\ personas mirando ahora" \}\]/g,
        '"runs": []'
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
    const response = await youtubeChannelScrapper("UCPqrEgBEHVj4vDITrClNQIw");
    const expectedData = {
      cid: "UCPqrEgBEHVj4vDITrClNQIw",
      live: true,
      liveSince: "(?)",
      title:
        "American English Listening Practice Level 1 - English Listening Comprehension",
      vid: "F8gbJUXaeo0",
      viewCount: 0,
    };
    expect(response).toEqual(expectedData);
  });

  test("Successfully Scraps YouTube Channel page when is not live (and has an scheduled transmission)", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../src/mock/html/stream-not-live.mock.html"),
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
    const response = await youtubeChannelScrapper("UCPX3yijEA2s1jTJGDlUnGsQ");
    const expectedData = {
      cid: "UCPX3yijEA2s1jTJGDlUnGsQ",
      live: false,
      scheduledStartTime: "1677432900",
    };
    expect(response).toEqual(expectedData);
  });

  test("Successfully Scraps YouTube Channel page when is not live (and has not an scheduled transmission)", async () => {
    const html = fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../../src/mock/html/stream-not-live.mock.html"
        ),
        "utf8"
      )
      .replace(/"status":"LIVE_STREAM_OFFLINE",/g, "");
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
    const response = await youtubeChannelScrapper("UCPX3yijEA2s1jTJGDlUnGsQ");
    const expectedData = {
      cid: "UCPX3yijEA2s1jTJGDlUnGsQ",
      live: false,
      scheduledStartTime: 0,
    };
    expect(response).toEqual(expectedData);
  });

  test("Throws an Error on a Server Error", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../src/mock/html/stream-not-live.mock.html"),
      "utf8"
    );
    /** @type {Axios.AxiosError} */
    const mockAxiosResponse = new Axios.AxiosError();
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(mockAxiosResponse));
    try {
      const response = await youtubeChannelScrapper("UCPX3yijEA2s1jTJGDlUnGsQ");
    } catch (/** @type {unknown} */ e) {
      expect(String(e)).toEqual("Error");
    }
  });
});
