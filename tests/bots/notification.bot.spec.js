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
        findAll: () => [],
      },
      live: {
        findOne: jest.fn(() => Promise.resolve(null)),
        create: jest.fn(() => Promise.resolve({})),
      },
      log_entry: {
        create: jest.fn(() => Promise.resolve({})),
      },
      sequelize: {
        close: jest.fn(() => Promise.resolve({})),
      },
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

describe("NotificationBot Action", () => {
  beforeAll(() => {
    // jest.replaceProperty(process, "argv", ["--use_strict"]);
    jest.resetAllMocks();
  });
  it("should execute notifyChannels() function actions", async () => {
    jest.mocked(Perf).mockImplementation(() => {
      return {
        begin: jest.fn().mockReturnValue({
          finish: jest.fn().mockReturnValue({ showStats: jest.fn() }),
        }),
      };
    });
    await notifyChannels();
    expect(connect).toHaveBeenCalled();
    expect(showDebugInfo).toHaveBeenCalled();
    expect(Perf).toHaveBeenCalled();
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
