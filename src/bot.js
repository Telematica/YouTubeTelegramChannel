// @ts-check
require("dotenv").config({ path: __dirname + "/../.env" });

const YouTubeTypes = require("./@types/youtube.types");
const {
  CONSOLE,
  TELEGRAM_CHANNEL_OR_GROUP,
} = require("./constants/app.constants");
const { connect, models, sequelize } = require("./db/connect.db");
const telegramSendMessage = require("./requests/telegram-send-message.request");
const youtubeChannelScrapper = require("./scrappers/youtube-channel.scrapper");
const { getYearMonthDayString } = require("./utils/date.utils");
const { showDebugInfo } = require("./utils/debug.utils");
const { consoleMessage } = require("./utils/string-template.utils");
const {
  openOrCreateAndWriteErrorLogFile,
} = require("./utils/file-system.utils");
const Perf = require("./utils/performance.utils");

const { channel: Channel, live: Live, log_entry: LogEntry } = models;

/** @type {Date} */
const logDate = new Date();

/** @type {string} */
const logFormattedDate = getYearMonthDayString(logDate);

/** @type {string} */
// const logFileExtension = ".log.json";

/** @type {string} */
const errorLogFileExtension = ".error.log";

/** @type {string} */
const ERROR_LOG_FILE_DIRECTORY = __dirname + "/../logs/errors";

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

    /** @type {string} */
    let message = "This is bad!";

    await connect();

    await sequelize.transaction(async (t) => {
      /** @type Array<YouTubeTypes.YouTubeChannelType> */
      const channels = await Channel.findAll({ raw: true }, { transaction: t });

      for (const channel of channels) {
        try {
          /** @type {YouTubeTypes.YouTubeLiveDataType} */
          const youtubeData = await youtubeChannelScrapper(channel.id);

          if (youtubeData.live) {
            let video = await Live.findOne({
              where: { vid: youtubeData.vid },
              transaction: t,
            });

            if (video) {
              message = consoleMessage(CONSOLE.ALREADY_NOTIFIED, {
                youtubeData,
                channel,
              });
              await LogEntry.create(
                {
                  log_status_id: 1,
                  channel_id: channel.id,
                },
                { transaction: t }
              );
            } else {
              message = consoleMessage(CONSOLE.NOTIFIED, {
                youtubeData,
                channel,
              });
              await Live.create(
                {
                  vid: youtubeData.vid,
                  channel_id: youtubeData.cid,
                  live: youtubeData.live,
                  title: youtubeData.title,
                  thumbnail: youtubeData.thumbnail,
                  scheduled_start_time: youtubeData.scheduledStartTime,
                  actual_start_time: youtubeData.actualStartTime,
                  view_count: youtubeData.viewCount,
                  live_since: youtubeData.liveSince,
                },
                { transaction: t }
              );
              await LogEntry.create(
                { log_status_id: 2, channel_id: channel.id },
                { transaction: t }
              );
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
            // scheduledStartTime: String((parseInt(youtubeData.scheduledStartTime || "0", 10) || 0) * 1000),
            message = consoleMessage(CONSOLE.NOT_LIVE, {
              youtubeData,
              channel,
            });
            await LogEntry.create(
              { log_status_id: 3, channel_id: channel.id },
              { transaction: t }
            );
          }
        } catch (liveRequestError) {
          openOrCreateAndWriteErrorLogFile({
            error: liveRequestError,
            logFormattedDate,
            errorLogFileDirectory: ERROR_LOG_FILE_DIRECTORY,
            errorLogFileExtension,
          });
          message = consoleMessage(CONSOLE.SERVER_ERROR, { liveRequestError });
          await LogEntry.create(
            { log_status_id: 4, channel_id: channel.id },
            { transaction: t }
          );
        }

        console.log(message);
      }
    });
    perf.finish().showStats();
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
