//@ts-check
const YouTubeTypes = require("../@types/youtube.types");
const TikTokTypes = require("../@types/tiktok.types");
const { CONSOLE } = require("../constants/app.constants");

/**
 * @typedef ConsoleMessageProps
 * @property {YouTubeTypes.YouTubeLiveDataType} [youtubeData]
 * @property {YouTubeTypes.YouTubeChannelType} [channel]
 * @property {unknown} [liveRequestError]
 */

/**
 * @typedef ConsoleMessageTiktokProps
 * @property {TikTokTypes.TikTokLiveDataType} [tiktokData]
 * @property {TikTokTypes.TikTokUserType} [user]
 * @property {unknown} [liveRequestError]
 */

/**
 *
 * @param {string} type
 * @param {ConsoleMessageProps} param2
 * @returns {string} Console Message
 */
function consoleMessage(type, { youtubeData, channel, liveRequestError }) {
  const {
    ALREADY_NOTIFIED,
    NOTIFIED,
    TELEGRAM_MESSAGE,
    NOT_LIVE,
    SERVER_ERROR,
  } = CONSOLE;
  const defaultMessage = "NOTHING TO SAY!";
  if (!!youtubeData && !!channel) {
    switch (type) {
      case ALREADY_NOTIFIED:
        return `Esta transmisión ya fue notificada: ${youtubeData.vid} - ${channel.name}: ${channel.id}`;
      case NOTIFIED:
        return `¡Transmisión Notificada! : ${youtubeData.vid} - ${channel.name}: ${channel.id}`;
      case TELEGRAM_MESSAGE:
        return `🔴 ¡${
          channel.name
        } está transmitiendo En Vivo! \n\n 🔗 Entra a: http://youtu.be/${
          youtubeData.vid
        } \n\n 🕒 ${
          youtubeData.liveSince
        } \n\n 👥 Espectadores: ${new Intl.NumberFormat("es-MX", {
          maximumSignificantDigits: 3,
        }).format(youtubeData.viewCount || 0)}`;
      case NOT_LIVE:
        return `El Canal no está en vivo: ${channel.name}: ${channel.id}. Programado para: ${youtubeData.scheduledStartTime}`;
      case SERVER_ERROR:
        return `¡Hubo un Error en la Petición al Canal! ${String(
          liveRequestError
        )}`;
      default:
        return defaultMessage;
    }
  } else if (!!liveRequestError) {
    return `¡Hubo un Error en la Petición al Canal! ${String(
      liveRequestError
    )}`;
  }
  return defaultMessage;
}

/**
 *
 * @param {string} type
 * @param {ConsoleMessageTiktokProps} param2
 * @returns {string} Console Message
 */
function consoleMessageTiktok(type, { tiktokData, user, liveRequestError }) {
  const {
    ALREADY_NOTIFIED,
    NOTIFIED,
    TELEGRAM_MESSAGE,
    NOT_LIVE,
    SERVER_ERROR,
  } = CONSOLE;
  const defaultMessage = "NOTHING TO SAY!";
  if (!!tiktokData && !!user) {
    switch (type) {
      case ALREADY_NOTIFIED:
        return `Esta transmisión ya fue notificada: ${tiktokData.roomId} - ${user.unique_id}: ${user.id}`;
      case NOTIFIED:
        return `¡Transmisión Notificada! : ${tiktokData.roomId} - ${user.unique_id}: ${user.id}`;
      case TELEGRAM_MESSAGE:
        return `🔴 ¡${
          user.nickname
        } está transmitiendo En Vivo! \n\n 🔗 Entra a: https://tiktok.com/@${
          user.unique_id
        }/live \n\n 🕒 Comenzó a transmitir: ${new Date(
          parseInt(tiktokData.liveSince + "000", 10)
        ).toLocaleDateString()} ${new Date(
          parseInt(tiktokData.liveSince + "000", 10)
        ).toLocaleTimeString()} \n\n 👥 Espectadores: ${new Intl.NumberFormat(
          "es-MX",
          {
            maximumSignificantDigits: 3,
          }
        ).format(tiktokData.viewCount || 0)}`;
      case NOT_LIVE:
        return `El Canal no está en vivo: ${user.unique_id}: ${user.id}.`;
      case SERVER_ERROR:
        return `¡Hubo un Error en la Petición al Canal! ${String(
          liveRequestError
        )}`;
      default:
        return defaultMessage;
    }
  } else if (!!liveRequestError) {
    return `¡Hubo un Error en la Petición al Canal! ${String(
      liveRequestError
    )}`;
  }
  return defaultMessage;
}

module.exports = {
  consoleMessage,
  consoleMessageTiktok,
};
