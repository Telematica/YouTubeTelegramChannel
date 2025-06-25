// @ts-check
require("dotenv").config({ path: __dirname + "/../../.env" });

const YouTubeTypes = require("../@types/youtube.types");
const TikTokTypes = require("../@types/tiktok.types");
const {
  CONSOLE,
  TELEGRAM_CHANNEL_OR_GROUP,
  TELEGRAM_CHANNEL_TIKTOK,
} = require("../constants/app.constants");
const { connect, models, sequelize } = require("../db/connect.db");
const telegramSendMessage = require("../requests/telegram-send-message.request");
const tiktokUserScrapper = require("../scrappers/tiktok/tiktok-user.scrapper");
const youtubeChannelScrapper = require("../scrappers/youtube-channel.scrapper");
const { getYearMonthDayString } = require("../utils/date.utils");
const { showDebugInfo } = require("../utils/debug.utils");
const {
  consoleMessage,
  consoleMessageTiktok,
} = require("../utils/string-template.utils");
const {
  openOrCreateAndWriteErrorLogFile,
} = require("../utils/file-system.utils");
const Perf = require("../utils/performance.utils");

const {
  channel: Channel,
  live: Live,
  log_entry: LogEntry,
  tiktok_user: TikTokUser,
  tiktok_live: TikTokLive,
  tiktok_log_entry: TikTokLogEntry,
} = models;

/** @type {Date} */
const logDate = new Date();

/** @type {string} */
const logFormattedDate = getYearMonthDayString(logDate);

/** @type {string} */
const errorLogFileExtension = ".error.log";

/** @type {string} */
const ERROR_LOG_FILE_DIRECTORY = __dirname + "/../../logs/errors";

/** @type {(t: any) => Promise<any>} */
const tiktokBatch = async (t) => {
  /** @type Array<TikTokTypes.TikTokUserType> */
  const tiktokUsers = await TikTokUser.findAll(
    { raw: true },
    { transaction: t }
  );

  /** @type {string} */
  let message = "This is bad!";

  for (const user of tiktokUsers) {
    try {
      /** @type {TikTokTypes.TikTokLiveDataType} */
      const tiktokData = await tiktokUserScrapper(`@${user.unique_id}`);

      if (tiktokData.live) {
        let video = await TikTokLive.findOne({
          where: { room_id: tiktokData.roomId },
          transaction: t,
        });

        if (video) {
          message = consoleMessageTiktok(CONSOLE.ALREADY_NOTIFIED, {
            tiktokData,
            user,
          });
          await TikTokLogEntry.create(
            {
              log_status_id: 1,
              tiktok_user_id: user.id,
            },
            { transaction: t }
          );
        } else {
          message = consoleMessageTiktok(CONSOLE.NOTIFIED, {
            tiktokData,
            user,
          });
          await TikTokLive.create(
            {
              room_id: tiktokData.roomId,
              tiktok_user_id: user.id,
              live: tiktokData.live,
              title: tiktokData.title,
              thumbnail: tiktokData.thumbnail,
              view_count: tiktokData.viewCount,
              live_since: tiktokData.liveSince,
            },
            { transaction: t }
          );
          await TikTokLogEntry.create(
            { log_status_id: 2, tiktok_user_id: user.id },
            { transaction: t }
          );
          await telegramSendMessage({
            chat_id: TELEGRAM_CHANNEL_TIKTOK,
            text: consoleMessageTiktok(CONSOLE.TELEGRAM_MESSAGE, {
              tiktokData,
              user,
            }),
            disable_notification: Boolean(
              parseInt(user.disable_notification, 10)
            ),
          });
        }
      } else {
        // @todo scheduledStartTime logic to notify twice: when scheduled and when live
        // scheduledStartTime: String((parseInt(youtubeData.scheduledStartTime || "0", 10) || 0) * 1000),
        message = consoleMessageTiktok(CONSOLE.NOT_LIVE, {
          tiktokData,
          user,
        });
        await TikTokLogEntry.create(
          { log_status_id: 3, tiktok_user_id: user.id },
          { transaction: t }
        );
      }
    } catch (/** @type {any} */ liveRequestError) {
      openOrCreateAndWriteErrorLogFile({
        error: `Exception on Channel request: \n ${liveRequestError.stack}`,
        logFormattedDate,
        errorLogFileDirectory: ERROR_LOG_FILE_DIRECTORY,
        errorLogFileExtension,
      });
      message = consoleMessageTiktok(CONSOLE.SERVER_ERROR, { liveRequestError });
      await TikTokLogEntry.create(
        { log_status_id: 4, tiktok_user_id: user.id },
        { transaction: t }
      );
    }

    console.log(message);
  }
};

/** @type {(t: any) => Promise<any>} */
const youtubeBatch = async (t) => {
  /** @type Array<YouTubeTypes.YouTubeChannelType> */
  const channels = await Channel.findAll({ raw: true }, { transaction: t });

  /** @type {string} */
  let message = "This is bad!";

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
            disable_notification: Boolean(
              parseInt(channel.disable_notification ?? "0", 10)
            ),
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
    } catch (/** @type {any} */ liveRequestError) {
      openOrCreateAndWriteErrorLogFile({
        error: `Exception on Channel request: \n ${liveRequestError.stack}`,
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
};

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

    await connect();

    await sequelize.transaction(async (t) => {
      await tiktokBatch(t);
      await youtubeBatch(t);
    });
    sequelize.close();
    perf.finish().showStats();
  } catch (/** @type {any} */ e) {
    console.log(String(e));
    openOrCreateAndWriteErrorLogFile({
      error: `Exception on main thread: \n ${e.stack}`,
      logFormattedDate,
      errorLogFileDirectory: ERROR_LOG_FILE_DIRECTORY,
      errorLogFileExtension,
    });
  }
})();

// Gilberto Téllez => Radio Búfalo
