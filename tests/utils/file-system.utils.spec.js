const fs = require("fs");
const {
  openOrCreateAndWriteErrorLogFile,
} = require("../../src/utils/file-system.utils");

jest.mock("fs", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("../__mocks__/fs");
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    existsSync: jest.fn(() => true),
    appendFile: jest.fn((file, content, callback) => {
      callback("someData");
    }),
    writeFile: jest.fn((file, content, callback) => {
      callback("someData");
    }),
  };
});

const MOCK_FILE_INFO = {
  "/path/to/file/2023-10-01.error.log": 'console.log("file1 contents");',
  "/path/to/file2.txt": "file2 contents",
};

describe("Perf Class", () => {
  test("openOrCreateAndWriteErrorLogFile function should create a new error log file", async () => {
    // @ts-ignore
    fs.appendFile = jest.fn();
    openOrCreateAndWriteErrorLogFile({
      error: "Test error",
      logFormattedDate: "2023-10-01",
      errorLogFileDirectory: "/path/to/file",
      errorLogFileExtension: ".error.log",
    });
    expect(fs.existsSync).toHaveReturnedWith(true);
    expect(fs.appendFile).toHaveBeenCalled();
  });

  test("openOrCreateAndWriteErrorLogFile function should throw an error when creating a new error log file fails", async () => {
    try {
      // @ts-ignore
      fs.appendFile = jest.fn((file, content, callback) => {
        callback("someData");
      });
      openOrCreateAndWriteErrorLogFile({
        error: "Test error",
        logFormattedDate: "2023-10-01",
        errorLogFileDirectory: "/path/to/file",
        errorLogFileExtension: ".error.log",
      });
    } catch (error) {
      expect(error).toBe("someData");
      expect(fs.existsSync).toHaveReturnedWith(true);
      expect(fs.appendFile).toHaveBeenCalled();
    }
  });

  test("openOrCreateAndWriteErrorLogFile function should print a message when creating a new error log file succeeded", async () => {
    try {
      // @ts-ignore
      fs.appendFile = jest.fn((file, content, callback) => {
        callback(false);
      });
      openOrCreateAndWriteErrorLogFile({
        error: "Test error",
        logFormattedDate: "2023-10-01",
        errorLogFileDirectory: "/path/to/file",
        errorLogFileExtension: ".error.log",
      });
    } catch (error) {
      expect(error).toBe("someData");
      expect(fs.existsSync).toHaveReturnedWith(true);
      expect(fs.appendFile).toHaveBeenCalled();
    }
  });

  test("openOrCreateAndWriteErrorLogFile function should throw exception when writing a existing error log file fails", async () => {
    try {
      fs.existsSync = jest.fn(() => false);
      openOrCreateAndWriteErrorLogFile({
        error: "Test error",
        logFormattedDate: "2023-10-01",
        errorLogFileDirectory: "/path/to/file",
        errorLogFileExtension: ".error.log",
      });
    } catch (error) {
      expect(error).toBe("someData");
      expect(fs.existsSync).toHaveReturnedWith(false);
    }
  });

  test("openOrCreateAndWriteErrorLogFile function should write a existing error log file", async () => {
    fs.existsSync = jest.fn(() => false);
    // @ts-ignore
    fs.writeFile = jest.fn();
    openOrCreateAndWriteErrorLogFile({
      error: "Test error",
      logFormattedDate: "2023-10-01",
      errorLogFileDirectory: "/path/to/file",
      errorLogFileExtension: ".error.log",
    });
    expect(fs.existsSync).toHaveReturnedWith(false);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test("openOrCreateAndWriteErrorLogFile function should print a message when writing an existing error log file succeeded", async () => {
    try {
      fs.existsSync = jest.fn(() => false);
      // @ts-ignore
      fs.writeFile = jest.fn((file, content, callback) => {
        callback(false);
      });
      openOrCreateAndWriteErrorLogFile({
        error: "Test error",
        logFormattedDate: "2023-10-01",
        errorLogFileDirectory: "/path/to/file",
        errorLogFileExtension: ".error.log",
      });
    } catch (error) {
      expect(error).toBe("someData");
      expect(fs.existsSync).toHaveReturnedWith(false);
    }
  });
});
