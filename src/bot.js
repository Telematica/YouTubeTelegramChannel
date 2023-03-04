// @ts-check
require("dotenv").config({ path: __dirname + "/../.env" });

const fs = require("fs");
const YouTubeTypes = require("./@types/youtube.types");
const {
  CONSOLE,
  TELEGRAM_CHANNEL_OR_GROUP,
} = require("./constants/app.constants");
const { YOUTUBE_CHANNELS } = require("./constants/youtube.constants");
const telegramSendMessage = require("./requests/telegram-send-message.request");
const youtubeChannelScrapper = require("./scrappers/youtube-channel.scrapper");
const { getYearMonthDayString } = require("./utils/date.utils");
const { showDebugInfo } = require("./utils/debug.utils");
const { consoleMessage } = require("./utils/string-template.utils");
const {
  openOrCreateLogFile,
  openOrCreateAndWriteErrorLogFile,
} = require("./utils/file-system.utils");
const Perf = require("./utils/performance.utils");

/** @type {Date} */
const logDate = new Date();

/** @type {string} */
const logFormattedDate = getYearMonthDayString(logDate);

/** @type {string} */
const logFileExtension = ".log.json";

/** @type {string} */
const errorLogFileExtension = ".error.log";

/** @type {string} */
const logFilename = `${logFormattedDate}${logFileExtension}`;

/** @type {string} */
const LOG_FILE_DIRECTORY = __dirname + "/../logs";

/** @type {string} */
const ERROR_LOG_FILE_DIRECTORY = __dirname + "/../logs/errors";

/** @type {string} */
const STREAMS_FILE = __dirname + "/data/streams.json";

/**
 * @function
 * @description Main Function IIFE
 * @returns {void}
 */
(async () => {
  try {
    showDebugInfo(process.env);

    /** @type {Perf} */
    const perf = new Perf().begin();

    /** @type {Array<any>} */
    const log = openOrCreateLogFile({
      logFileDirectory: LOG_FILE_DIRECTORY,
      logFilename: logFilename,
    });

    /** @type {Array<any>} */
    const logEntry = [];

    /** @type {Array<YouTubeTypes.YouTubeTransmissionType>} */
    const transmissions = JSON.parse(
      fs.readFileSync(STREAMS_FILE).toString() || "[]"
    );

    /** @type {string} */
    let message = "This is bad!";

    for (const channel of YOUTUBE_CHANNELS) {
      try {
        /** @type {YouTubeTypes.YouTubeLiveDataType} */
        const youtubeData = await youtubeChannelScrapper(channel.id);

        if (youtubeData.live) {
          let video = transmissions.find((t) => t.id === youtubeData.vid);

          if (video) {
            message = consoleMessage(CONSOLE.ALREADY_NOTIFIED, {
              youtubeData,
              channel,
            });
            logEntry.push({ error: message, date: new Date() });
          } else {
            message = consoleMessage(CONSOLE.NOTIFIED, {
              youtubeData,
              channel,
            });
            transmissions.push({
              id: String(youtubeData.vid),
              startTimestamp: null,
              channelId: `${channel.id}`,
            });
            logEntry.push({ success: message, date: new Date() });
            await telegramSendMessage({
              chat_id: TELEGRAM_CHANNEL_OR_GROUP,
              text: consoleMessage(CONSOLE.TELEGRAM_MESSAGE, {
                youtubeData,
                channel,
              }),
              disable_notification: channel.id !== "UCNQqL-xd30otxNGRL5UeFFQ",
            });
          }
        } else {
          // @todo scheduledStartTime logic to notify twice: when scheduled and when live
          message = consoleMessage(CONSOLE.NOT_LIVE, { youtubeData, channel });
          logEntry.push({ error: message, date: new Date() });
        }
      } catch (liveRequestError) {
        message = consoleMessage(CONSOLE.SERVER_ERROR, { liveRequestError });
        logEntry.push({ error: message, date: new Date() });
      }

      console.log(message);
    }

    fs.writeFileSync(STREAMS_FILE, JSON.stringify(transmissions, null, 2));
    perf.finish().showStats();
    logEntry.push(perf.getStats());
    log.push(logEntry);
    fs.writeFileSync(
      `${LOG_FILE_DIRECTORY}/${logFilename}`,
      JSON.stringify(log, null, 2)
    );
  } catch (/** @type {unknown} */ e) {
    console.log(String(e));
    openOrCreateAndWriteErrorLogFile({
      error: e,
      logFormattedDate,
      errorLogFileDirectory: ERROR_LOG_FILE_DIRECTORY,
      errorLogFileExtension,
    });
  }
})();
