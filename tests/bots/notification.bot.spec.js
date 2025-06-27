//@ts-check
//const NotificationBot = require("../../src/bots/notification.bot.js");

describe("NotificationBot", () => {
  beforeAll(() => {
    jest.replaceProperty(process, "argv", ["--channel", "@MrBeast"]);
  });
  it("should ", async () => {});
});
