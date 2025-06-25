//@ts-check
const axios = require("axios").default;
const Axios = require("axios");
const fs = require("fs");
const path = require("path");
const tiktokUserScrapper = require("../../../src/scrappers/tiktok/tiktok-user.scrapper");

jest.mock("axios");

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

describe("tiktokUserScrapper Scrapping Script", () => {
  test("Successfully Scraps Tiktok Live Page data from a valid user ID when user is live", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../src/mock/tiktok/live.mock.html"),
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
    const response = await tiktokUserScrapper("@9maafer6");
    const expectedData = {
      live: true,
      liveSince: undefined,
      roomId: "7519705674660219654",
      title: "(NO TITLE)",
      uniqueId: "@9maafer6",
      viewCount: 0
    };
    expect(response).toEqual(expectedData);
  });
  test("Successfully Scraps Tiktok Live Page data from a valid user ID when user is not live", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../src/mock/tiktok/not-live.mock.html"),
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
    const response = await tiktokUserScrapper("@9maafer6");
    const expectedData = {
      live: false,
      uniqueId: "@9maafer6",
    };
    expect(response).toEqual(expectedData);
  });
  test("Throws an Error on a Server Error", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../src/mock/tiktok/live.mock.html"),
      "utf8"
    );
    /** @type {Axios.AxiosError} */
    const mockAxiosResponse = new Axios.AxiosError();
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(mockAxiosResponse));
    try {
      const response = await tiktokUserScrapper("labettydetemu");
    } catch (/** @type {unknown} */ e) {
      expect(String(e)).toEqual("Error");
    }
  });
});
