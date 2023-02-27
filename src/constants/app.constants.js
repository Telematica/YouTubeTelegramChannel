module.exports = {
  API_TOKEN: process.env.API_TOKEN,
  TELEGRAM_API_URL: "https://api.telegram.org/bot",
  TELEGRAM_CHANNEL_OR_GROUP: process.env.TELEGRAM_CHANNEL_OR_GROUP,
  RESPONSE_MESSAGES: {
    CHANNEL_ERROR: "¡Hubo un Error en la Petición al Canal!",
  }
};
