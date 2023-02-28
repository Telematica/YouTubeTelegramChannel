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
        headers: {
        },
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
});
