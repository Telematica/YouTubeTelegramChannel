//@ts-check
const YouTubeTypes = require("../@types/youtube.types");

/**
 * @typedef ConsoleMessageProps
 * @property {YouTubeTypes.YouTubeLiveDataType} [youtubeData]
 * @property {YouTubeTypes.YouTubeChannelType} [channel]
 * @property {unknown} [liveRequestError]
 */

/**
 *
 * @param {string} type
 * @param {ConsoleMessageProps} param2
 * @returns {string} Console Message
 */
function consoleMessage(type, { youtubeData, channel, liveRequestError }) {
  const defaultMessage = "NOTHING TO SAY!";
  if (!!youtubeData && !!channel) {
    switch (type) {
      case "ALREADY_NOTIFIED":
        return `Esta transmisión ya fue notificada: ${youtubeData.vid} - ${channel.name}: ${channel.id}`;
      case "NOTIFIED":
        return `¡Transmisión Notificada! : ${youtubeData.vid} - ${channel.name}: ${channel.id}`;
      case "TELEGRAM_MESSAGE":
        return `🔴 ¡${
          channel.name
        } está transmitiendo En Vivo! \n\n 🔗 Entra a: http://youtu.be/${
          youtubeData.vid
        } \n\n 🕒 ${
          youtubeData.liveSince
        } \n\n 👥 Espectadores: ${new Intl.NumberFormat("es-MX", {
          maximumSignificantDigits: 3,
        }).format(youtubeData.viewCount || 0)}`;
      case "NOT_LIVE":
        return `El Canal no está en vivo: ${channel.name}: ${channel.id}. Programado para: ${youtubeData.scheduledStartTime}`;
      case "SERVER_ERROR":
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
};
