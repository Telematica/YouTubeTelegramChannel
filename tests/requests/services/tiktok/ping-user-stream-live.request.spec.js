const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const pingUserStreamLive = require("../../../../src/requests/services/tiktok/ping-user-stream-live.request");

jest.mock("axios");

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

describe("pingUserStreamLive Request", () => {
  test("Successful GET html contents using a Channel Vanity URL", async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../../../../src/mock/tiktok/user-live.html"),
      "utf8"
    );
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(html));
    const response = await pingUserStreamLive("@channelId");
    expect(response).toEqual(html);
  });

  test("Unsuccessful GET reject value in case of an error", async () => {
    const err = new axios.AxiosError("Server error.");
    // @ts-ignore
    axios.get.mockRejectedValueOnce(err);
    try {
      await pingUserStreamLive("@channelId");
    } catch (e) {
      expect(e).toEqual(err);
      // @ts-ignore
      expect(e.isAxiosError).toEqual(true);
    }
  });
});
