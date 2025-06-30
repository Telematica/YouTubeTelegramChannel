//@ts-check
const { Transaction } = require("sequelize");
const { notifyChannels } = require("../../src/bots/notification.bot.js");
const { connect, models, sequelize } = require("../../src/db/connect.db");
const telegramSendMessage = require("../../src/requests/telegram-send-message.request");
const { showDebugInfo } = require("../../src/utils/debug.utils");
const Perf = require("../../src/utils/performance.utils");
const {
  openOrCreateAndWriteErrorLogFile,
} = require("../../src/utils/file-system.utils");
const tiktokUserScrapper = require("../../src/scrappers/tiktok/tiktok-user.scrapper");

jest.mock("../../src/db/connect.db", () => {
  return {
    ...jest.requireActual("../../src/db/connect.db"),
    __esModule: true,
    connect: jest.fn(() => Promise.resolve({})),
    models: {
      channel: {
        findAll: () => [],
      },
      tiktok_user: {
        findAll: () => [
          { unique_id: "test", id: "test_id", disable_notification: 0 },
        ],
      },
      tiktok_live: {
        create: () => jest.fn(),
        findOne: () => [
          {
            room_id: "test",
            tiktok_user_id: "test_id",
            live: true,
            title: "",
            thumbnail: "",
            view_count: 0,
            live_since: 0,
          },
        ],
      },
      tiktok_log_entry: {
        create: () => jest.fn(),
      },
      live: {
        findOne: jest.fn(() => Promise.resolve(null)),
        create: jest.fn(() => Promise.resolve({})),
      },
      log_entry: {
        create: jest.fn(() => Promise.resolve({})),
      },
    },
    sequelize: {
      transaction: jest.fn((callback) => callback()),
      close: jest.fn(() => Promise.resolve({})),
    },
  };
});

jest.mock("../../src/requests/telegram-send-message.request", () => ({
  ...jest.requireActual("../../src/requests/telegram-send-message.request"),
  __esModule: true,
  default: jest.fn(() => Promise.resolve({})),
}));

jest.mock("../../src/utils/debug.utils", () => ({
  ...jest.requireActual("../../src/utils/debug.utils"),
  __esModule: true,
  showDebugInfo: jest.fn(),
}));

jest.mock("../../src/utils/performance.utils");

jest.mock("../../src/utils/file-system.utils");

jest.mock("../../src/scrappers/tiktok/tiktok-user.scrapper");

describe("NotificationBot Action", () => {
  beforeAll(() => {
    // jest.replaceProperty(process, "argv", ["--use_strict"]);
    // jest.resetAllMocks();
    jest.mocked(Perf).mockImplementation(() => {
      return {
        begin: jest.fn().mockReturnValue({
          finish: jest.fn().mockReturnValue({ showStats: jest.fn() }),
        }),
      };
    });
  });

  it("should execute notifyChannels() and notify when a Tiktok or YouTube Channel is live", async () => {
    jest.mocked(tiktokUserScrapper).mockImplementation(
      /**
       * The CallAgain method calls the provided function twice
       * @param {string} uniqueId function to call twice
       * @return {any} The result of the function call
       */
      (uniqueId) => {
        return Promise.resolve({
          live: true,
          roomId: "test_room_id",
          title: "test_title",
          thumbnail: "test_thumbnail",
          viewCount: 100,
          liveSince: "2021-01-01T00:00:00.000Z",
          uniqueId,
        });
      }
    );
    global.console.log = jest.fn();
    await notifyChannels();
    expect(connect).toHaveBeenCalled();
    expect(showDebugInfo).toHaveBeenCalled();
    expect(Perf).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "Esta transmisión ya fue notificada: test_room_id - test: test_id"
    );
  });

  it("should execute notifyChannels() and log in the console when a Tiktok or YouTube Channel is not live", async () => {
    jest.clearAllMocks();
    jest.mocked(tiktokUserScrapper).mockImplementation(
      /**
       * The CallAgain method calls the provided function twice
       * @param {string} uniqueId function to call twice
       * @return {any} The result of the function call
       */
      (uniqueId) => {
        return Promise.resolve({
          live: false,
          roomId: "test_room_id",
          title: "test_title",
          thumbnail: "test_thumbnail",
          viewCount: 100,
          liveSince: "2021-01-01T00:00:00.000Z",
          uniqueId,
        });
      }
    );
    jest.mocked(connect).mockImplementation(() => Promise.resolve());
    global.console.log = jest.fn();
    await notifyChannels();
    expect(connect).toHaveBeenCalled();
    expect(showDebugInfo).toHaveBeenCalled();
    expect(Perf).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "El Canal no está en vivo: test: test_id."
    );
  });

  it("should handle notifyChannels() occurring Exceptions", async () => {
    jest.mocked(showDebugInfo).mockImplementation(() => {
      throw new Error("Test Error");
    });
    global.console.log = jest.fn();
    const spy = jest.spyOn(console, "log");
    await notifyChannels();
    expect(spy).toHaveBeenCalledWith("Error: Test Error");
    expect(openOrCreateAndWriteErrorLogFile).toHaveBeenCalled();
  });
});
