// @ts-check
require("dotenv").config({ path: __dirname + "/../.env" });

const fs = require("fs");
const YouTubeTypes = require("./@types/youtube.types");
const { YOUTUBE_CHANNELS } = require("./constants/youtube.constants");
const telegramSendMessage = require("./requests/telegram-send-message.request");
const youtubeChannelScrapper = require("./scrappers/youtube-channel.scrapper");
const { getYearMonthDayString } = require("./utils/date.utils");
const { showDebugInfo } = require("./utils/debug.utils");
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
const STREAMS_FILE = __dirname + "/../legacy/streams.json";

/**
 * @description Open and retrieve log file contents as an Array of any
 * @returns {Array<any>} Array of any
 */
function openOrCreateLogFile() {
  /** @type {string} */
  let rawLogObj = "";

  /** @type {string} */
  const fullPathFile = `${LOG_FILE_DIRECTORY}/${logFilename}`;

  if (fs.existsSync(fullPathFile)) {
    rawLogObj = fs.readFileSync(fullPathFile).toString();
  } else {
    fs.writeFile(fullPathFile, "[]", (err) => {
      if (err) throw err;
      console.log("Log file was succesfully created!");
    });
  }
  return JSON.parse(rawLogObj || "[]");
}

/**
 * @description Open and write error log file
 * @param {unknown} error Caught Error
 * @returns {void}
 */
function openOrCreateAndWriteErrorLogFile(error) {
  /** @type {string} */
  const errorLogFilename = `${logFormattedDate}${errorLogFileExtension}`;

  /** @type {string} */
  const fullPathFile = `${ERROR_LOG_FILE_DIRECTORY}/${errorLogFilename}`;

  if (fs.existsSync(fullPathFile)) {
    fs.appendFile(fullPathFile, String(error), () => { });
  } else {
    fs.writeFile(
      fullPathFile,
      String(error) + " : " + new Date(),
      (err) => {
        if (err) throw err;
        console.log("Error log saved!");
      }
    );
  }
}

/**
 * @description Scrap Youtube Channel for info
 * @param {string} channelId Channel object
 * @returns {Promise<YouTubeTypes.YouTubeLiveDataType>} Youtube scrapped data
 * @throws {unknown}
 */
async function checkIfLive(channelId) {
  try {
    const info = await youtubeChannelScrapper(channelId);
    return info;
  } catch (e) {
    throw new Error("Scrapping Error: " + String(e));
  }
}

// Main Function IIFE
; (async () => {
  showDebugInfo(process.env);
  try {
    /** @type {Perf} */
    const perf = new Perf();

    perf.begin();

    /** @type {Array<any>} */
    const log = openOrCreateLogFile();

    /** @type {Array<any>} */
    const logEntry = [];

    /** @type {Array<YouTubeTypes.YouTubeTransmissionType>} */
    const transmissions = JSON.parse(fs.readFileSync(STREAMS_FILE).toString());

    for (const channel of YOUTUBE_CHANNELS) {
      try {
        /** @type {YouTubeTypes.YouTubeLiveDataType} */
        const youtubeData = await checkIfLive(channel.id);

        if (youtubeData.live) {
          let video = transmissions.find((t) => t.id === youtubeData.vid);
          if (video) {
            console.log(
              `Esta transmisión ya fue notificada: ${youtubeData.vid} - ${channel.name}: ${channel.id}`
            );
            logEntry.push({
              error: `Esta transmisión ya fue notificada: ${youtubeData.vid} - ${channel.name}: ${channel.id}`,
              date: new Date(),
            });
          } else {
            transmissions.push({
              id: String(youtubeData.vid),
              startTimestamp: null,
              channelId: `${channel.id}`,
            });
            logEntry.push({
              success: `¡Transmisión Notificada! : ${youtubeData.vid} - ${channel.name}: ${channel.id}`,
              date: new Date(),
            });
            await telegramSendMessage({
              chat_id: "@SinCensuraMedia",
              text: `🔴 ¡${channel.name} está transmitiendo En Vivo! \n\n 🔗 Entra a: http://youtu.be/${youtubeData.vid} \n\n 🕒 ${youtubeData.liveSince} \n\n 👥 Espectadores: ${youtubeData.viewCount}`,
              disable_notification: channel.id !== "UCNQqL-xd30otxNGRL5UeFFQ",
            });
          }
        } else {
          // @todo scheduledStartTime logic to notify twice: when scheduled and when live
          console.log(`El Canal no está en vivo: ${channel.name}: ${channel.id}. Programado para: ${youtubeData.scheduledStartTime}`);
          logEntry.push({
            error: `El Canal no está en vivo: ${channel.name}: ${channel.id}`,
            date: new Date(),
          });
        }
      } catch (liveRequestError) {
        console.log("¡Hubo un Error en la Petición al Canal! " + String(liveRequestError));
        logEntry.push({
          error: "¡Hubo un Error en la Petición al Canal! " + String(liveRequestError),
          date: new Date(),
        });
      }
    }

    fs.writeFileSync(STREAMS_FILE, JSON.stringify(transmissions, null, 2));
    perf.finish().showStats();
    logEntry.push(perf.getStats());
    log.push(logEntry);
    fs.writeFileSync(`${LOG_FILE_DIRECTORY}/${logFilename}`, JSON.stringify(log, null, 2));

  } catch (/** @type {unknown} */ e) {
    openOrCreateAndWriteErrorLogFile(e);
  }
})();
