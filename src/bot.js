// @ts-check
require("dotenv").config({ path: __dirname + "/.env" });

const fs = require("fs");
const { YOUTUBE_CHANNELS } = require("./constants/youtube.constants");
const telegramSendMessage = require("./requests/telegram-send-message.request");
const youtubeChannelScrapper = require("./scrappers/youtube-channel.scrapper");
const { formatBytes } = require("./utils/format-bytes.utils");
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
const LOG_FILE_DIRECTORY = __dirname + "/logs";

/** @type {string} */
const ERROR_LOG_FILE_DIRECTORY = __dirname + "/logs/errors";

/** @type {string} */
const STREAMS_FILE = __dirname + "/streams.json";

/**
 * Display Debug Info in the Console
 *
 * @returns {Array<any>}
 */
function openOrCreateLogFile() {
  /** @type {string|Buffer} */
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
 * 
 * @param {unknown} error Caught Error
 * @return {void}
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
 *
 * @param {YouTubeChannelType} channel
 * @returns {Promise<YouTubeLiveDataType|unknown>}
 * @throws {unknown}
 */
async function checkIfLive(channel) {
  try {
    const info = await youtubeChannelScrapper(channel.id);
    return info;
  } catch (e) {
    throw new Error("Scrapping Error");
  }
}

(async () => {
  showDebugInfo();
  try {
    /** @type {Perf} */
    const perf = new Perf();

    perf.begin();

    /** @type {Array<any>} */
    const log = openOrCreateLogFile();

    /** @type {Array<any>} */
    const logEntry = [];

    /** @type {Array<YouTubeTransmissionType>} */
    const transmissions = JSON.parse(
      fs.readFileSync(STREAMS_FILE).toString()
    );

    for (const channel of YOUTUBE_CHANNELS) {
      let streamData = {},
        time = "",
        date = "",
        viewers = "";
      await checkIfLive(channel.id)
        .then((data) => (streamData = data))
        .catch((error) => console.log(error));
      console.log(streamData);
      if (!streamData.success) {
        console.log("¡Hubo un Error en la Petición al Canal!");
        logEntry.push({
          error: "¡Hubo un Error en la Petición al Canal!",
          date: new Date(),
        });
      }

      if (!streamData.isLive && streamData.success) {
        console.log(`El Canal no está en vivo: ${channel.name}: ${channel.id}`);
        logEntry.push({
          error: `El Canal no está en vivo: ${channel.name}: ${channel.id}`,
          date: new Date(),
        });
      }

      if (streamData.isLive) {
        let rawdata = fs.readFileSync(__dirname + "/streams.json");
        let transmissions = JSON.parse(rawdata);
        let video = transmissions.find((t) => t.id === streamData.videoId);
        if (video) {
          console.log(
            `Esta transmisión ya fue notificada: ${streamData.videoId} - ${channel.name}: ${channel.id}`
          );
          logEntry.push({
            error: `Esta transmisión ya fue notificada: ${streamData.videoId} - ${channel.name}: ${channel.id}`,
            date: new Date(),
          });
        } else {
          await checkStreamDetails(streamData.videoId)
            .then((data) => {
              time = data.time;
              date = data.date;
              viewers = data.viewers;
            })
            .catch((error) => console.log(error));

          transmissions.push({
            id: streamData.videoId,
            startTimestamp: date,
            channelId: `${channel.id}`,
          });
          logEntry.push({
            success: `¡Transmisión Notificada! : ${streamData.videoId} - ${channel.name}: ${channel.id}`,
            date: new Date(),
          });
          fs.writeFileSync(
            __dirname + "/streams.json",
            JSON.stringify(transmissions, null, 2)
          );
          await sendMessage({
            chat_id: "@SinCensuraMedia",
            text: `🎞 🔴 ¡${channel.name} está transmitiendo En Vivo! \n\n ✪ Entra a: http://youtu.be/${streamData.videoId} \n\n ☑ Transmite desde: ${time} \n\n ☑ Espectadores: ${viewers}`,
            disable_notification: channel.id !== "UCNQqL-xd30otxNGRL5UeFFQ",
          });
        }
      }
    }

    perf.finish().showStats();
    logEntry.push(perf.getStats());
    log.push(logEntry);
    fs.writeFileSync(__dirname + `/logs/${logFilename}`, JSON.stringify(log, null, 2));
    
  } catch (/** @type unknown */ e) {
    openOrCreateAndWriteErrorLogFile(e);
  }
})();
