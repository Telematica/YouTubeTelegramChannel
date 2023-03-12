const YouTubeTypes = require("../../src/@types/youtube.types");
const { consoleMessage } = require("../../src/utils/string-template.utils");
const { YOUTUBE_CHANNELS } = require("../../src/constants/youtube.constants");
const { CONSOLE } = require("../../src/constants/app.constants");

const live = {
  cid: "UCPqrEgBEHVj4vDITrClNQIw",
  live: true,
  liveSince: "Comenzó a transmitir el 10 nov 2022",
  title:
    "American English Listening Practice Level 1 - English Listening Comprehension",
  vid: "F8gbJUXaeo0",
  viewCount: 132,
};

const notLive = {
  cid: "UCPX3yijEA2s1jTJGDlUnGsQ",
  live: false,
  scheduledStartTime: "1677432900",
};
const channel = YOUTUBE_CHANNELS[0];
const liveRequestError = new Error("Generic error");

describe("string-template Functions", () => {
  test("consoleMessage behavior: ALREADY_NOTIFIED", async () => {
    expect(
      consoleMessage(CONSOLE.ALREADY_NOTIFIED, { youtubeData: live, channel })
    ).toEqual(
      "Esta transmisión ya fue notificada: F8gbJUXaeo0 - Gobierno de México: UCvzHrtf9by1-UY67SfZse8w"
    );
  });
  test("consoleMessage behavior: NOTIFIED", async () => {
    expect(
      consoleMessage(CONSOLE.NOTIFIED, { youtubeData: live, channel })
    ).toEqual(
      "¡Transmisión Notificada! : F8gbJUXaeo0 - Gobierno de México: UCvzHrtf9by1-UY67SfZse8w"
    );
  });
  test("consoleMessage behavior: NOT_LIVE", async () => {
    expect(
      consoleMessage(CONSOLE.NOT_LIVE, { youtubeData: notLive, channel })
    ).toEqual(
      "El Canal no está en vivo: Gobierno de México: UCvzHrtf9by1-UY67SfZse8w. Programado para: 1677432900"
    );
  });
  test("consoleMessage behavior: SERVER_ERROR", async () => {
    expect(
      consoleMessage(CONSOLE.SERVER_ERROR, {
        youtubeData: notLive,
        channel,
        liveRequestError,
      })
    ).toEqual("¡Hubo un Error en la Petición al Canal! Error: Generic error");
  });
  test("consoleMessage behavior: SERVER_ERROR", async () => {
    expect(
      consoleMessage(CONSOLE.SERVER_ERROR, {
        liveRequestError,
      })
    ).toEqual("¡Hubo un Error en la Petición al Canal! Error: Generic error");
  });
  test("consoleMessage behavior: default", async () => {
    expect(consoleMessage("no-type", {})).toEqual("NOTHING TO SAY!");
  });
  test("consoleMessage behavior: default", async () => {
    expect(consoleMessage("no-type", { youtubeData: live, channel })).toEqual(
      "NOTHING TO SAY!"
    );
  });
  test("consoleMessage behavior: TELEGRAM_MESSAGE", async () => {
    expect(
      consoleMessage(CONSOLE.TELEGRAM_MESSAGE, {
        youtubeData: live,
        channel,
        liveRequestError,
      })
    ).toEqual(
      `🔴 ¡Gobierno de México está transmitiendo En Vivo! \n\n 🔗 Entra a: http://youtu.be/F8gbJUXaeo0 \n\n 🕒 Comenzó a transmitir el 10 nov 2022 \n\n 👥 Espectadores: 132`
    );
  });
  test("consoleMessage behavior: TELEGRAM_MESSAGE with no spectators", async () => {
    expect(
      consoleMessage(CONSOLE.TELEGRAM_MESSAGE, {
        youtubeData: { ...live, viewCount: undefined },
        channel,
        liveRequestError,
      })
    ).toEqual(
      `🔴 ¡Gobierno de México está transmitiendo En Vivo! \n\n 🔗 Entra a: http://youtu.be/F8gbJUXaeo0 \n\n 🕒 Comenzó a transmitir el 10 nov 2022 \n\n 👥 Espectadores: 0`
    );
  });
});
