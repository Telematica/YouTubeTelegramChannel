//@ts-check
const { getYouTubeProfileInfo } = require("../../src/bots/profile-info.bot");
const youtubeChannelScrapper = require("../../src/scrappers/youtube/youtube-channel-info.scrapper");

jest.mock("../../src/scrappers/youtube/youtube-channel-info.scrapper", () =>
  jest.fn(() => {
    const data = {
      canonical: "https://www.youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA",
      title: "MrBeast",
      vanityUrl: "http://www.youtube.com/@MrBeast",
    };
    return Promise.resolve(data);
  })
);

describe("Profile Info Bot", () => {
  beforeAll(() => {
    jest.replaceProperty(process, "argv", ["--channel", "@MrBeast"]);
  });
  it("should retrieve YouTube profile info via console", async () => {
    jest.replaceProperty(process, "argv", [
      "/binPath",
      "/scriptPath",
      "--channel",
      "@MrBeast",
    ]);
    const response = await getYouTubeProfileInfo();
    expect(response).toEqual({
      canonical: "https://www.youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA",
      title: "MrBeast",
      vanityUrl: "http://www.youtube.com/@MrBeast",
    });
  });
  it("should handle error when no argument is passed via console", async () => {
    jest.replaceProperty(process, "argv", ["/binPath", "/scriptPath"]);
    global.console.error = jest.fn();
    const response = await getYouTubeProfileInfo();
    console.log("getYouTubeProfileInfo", getYouTubeProfileInfo);
    expect(response).toEqual(void 0);
    expect(global.console.error).toHaveBeenCalledWith("Missing channel input.");
  });
  it("should handle error when Exception is raised", async () => {
    jest.mocked(youtubeChannelScrapper).mockRejectedValue(new Error("Async error", {cause: "Async error"}));
    jest.replaceProperty(process, "argv", [
      "/binPath",
      "/scriptPath",
      "--channel",
      "@MrBeast",
    ]);
    global.console.error = jest.fn();
    try {
      const response = await getYouTubeProfileInfo();
      expect(response).toEqual(void 0);
    } catch (error) {
      expect(global.console.error).toHaveBeenCalledWith(
        "Unexpected Error (maybe 500):",
        "Async error"
      );
    }
  });
});
