const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const homePageRequest = require("../../../../src/requests/services/youtube/home-page.request");

jest.mock("axios");

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

describe("pingChannelStreamLive Request", () => {
  test("Successful GET html contents", async () => {
    const html = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../src/mock/youtube/yt-channel-home.html"
      ),
      "utf8"
    );
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(html));
    const response = await homePageRequest("channelId");
    expect(response).toEqual(html);
  });

  test("Successful GET html contents using a Channel Vanity URL", async () => {
    const html = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../src/mock/youtube/yt-channel-home.html"
      ),
      "utf8"
    );
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(html));
    const response = await homePageRequest("@channelId");
    expect(response).toEqual(html);
  });

  test("Unsuccessful GET reject value in case of an error", async () => {
    const err = new axios.AxiosError("Server error.");
    // @ts-ignore
    axios.get.mockRejectedValueOnce(err);
    try {
      await homePageRequest("channelId");
    } catch (e) {
      expect(e).toEqual(err);
      // @ts-ignore
      expect(e.isAxiosError).toEqual(true);
    }
  });

  test("Unsuccessful GET reject value in case of an error 2", async () => {
    const err = new Error("Generic error");
    // @ts-ignore
    axios.get.mockRejectedValueOnce(err);
    try {
      await homePageRequest("channelId");
    } catch (e) {
      expect(String(e)).toEqual("Error: " + err.message);
    }
  });
});
