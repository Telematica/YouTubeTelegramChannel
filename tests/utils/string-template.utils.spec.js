const YouTubeTypes = require("../../src/@types/youtube.types");
const TikTokTypes = require("../../src/@types/tiktok.types");
const {
  consoleMessage,
  consoleMessageTiktok,
} = require("../../src/utils/string-template.utils");
const { YOUTUBE_CHANNELS } = require("../../src/constants/youtube.constants");
const { CONSOLE } = require("../../src/constants/app.constants");

/** @type {YouTubeTypes.YouTubeLiveDataType} */
const live = {
  cid: "UCPqrEgBEHVj4vDITrClNQIw",
  live: true,
  liveSince: "Comenzó a transmitir el 10 nov 2022",
  title:
    "American English Listening Practice Level 1 - English Listening Comprehension",
  vid: "F8gbJUXaeo0",
  viewCount: 132,
};

/** @type {YouTubeTypes.YouTubeLiveDataType} */
const notLive = {
  cid: "UCPX3yijEA2s1jTJGDlUnGsQ",
  live: false,
  scheduledStartTime: "1677432900",
};

/** @type {YouTubeTypes.YouTubeChannelType} */
const channel = YOUTUBE_CHANNELS[0];

/** @type {TikTokTypes.TikTokLiveDataType} */
const tiktokData = {
  uniqueId: "uniqueId12345",
  roomId: "roomId67890",
  live: true,
  title: "Adri Kraj - Kibutz",
  viewCount: 100,
  liveSince: 1677432900,
};

/** @type {TikTokTypes.TikTokUserType} */
const tiktokUser = {
  id: "adikraj",
  nickname: "Adri Kraj",
  unique_id: "00909309490340983",
  disable_notification: "0",
};

/** @type {Error} */
const liveRequestError = new Error("Generic error");

describe("string-template Functions", () => {
  describe("consoleMessage Function", () => {
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

  describe("consoleMessageTiktok Function", () => {
    test("consoleMessageTiktok behavior: ALREADY_NOTIFIED", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.ALREADY_NOTIFIED, {
          tiktokData,
          user: tiktokUser,
        })
      ).toEqual(
        "Esta transmisión ya fue notificada: roomId67890 - 00909309490340983: adikraj"
      );
    });
    test("consoleMessageTiktok behavior: NOTIFIED", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.NOTIFIED, { tiktokData, user: tiktokUser })
      ).toEqual(
        "¡Transmisión Notificada! : roomId67890 - 00909309490340983: adikraj"
      );
    });
    test("consoleMessageTiktok behavior: NOT_LIVE", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.NOT_LIVE, { tiktokData, user: tiktokUser })
      ).toEqual("El Canal no está en vivo: 00909309490340983: adikraj.");
    });
    test("consoleMessageTiktok behavior: SERVER_ERROR", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.SERVER_ERROR, {
          tiktokData,
          user: tiktokUser,
          liveRequestError,
        })
      ).toEqual("¡Hubo un Error en la Petición al Canal! Error: Generic error");
    });
    test("consoleMessageTiktok behavior: SERVER_ERROR", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.SERVER_ERROR, {
          liveRequestError,
        })
      ).toEqual("¡Hubo un Error en la Petición al Canal! Error: Generic error");
    });
    test("consoleMessageTiktok behavior: default", async () => {
      expect(consoleMessageTiktok("no-type", {})).toEqual("NOTHING TO SAY!");
    });
    test("consoleMessageTiktok behavior: default", async () => {
      expect(
        consoleMessageTiktok("no-type", { tiktokData, user: tiktokUser })
      ).toEqual("NOTHING TO SAY!");
    });
    test("consoleMessageTiktok behavior: TELEGRAM_MESSAGE", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.TELEGRAM_MESSAGE, {
          tiktokData,
          user: tiktokUser,
          liveRequestError,
        })
      ).toEqual(
        `🔴 ¡Adri Kraj está transmitiendo En Vivo! \n\n 🔗 Entra a: https://tiktok.com/@00909309490340983/live \n\n 🕒 Comenzó a transmitir: 2/26/2023 11:35:00 AM \n\n 👥 Espectadores: 100`
      );
    });
    test("consoleMessageTiktok behavior: TELEGRAM_MESSAGE with no spectators", async () => {
      expect(
        consoleMessageTiktok(CONSOLE.TELEGRAM_MESSAGE, {
          tiktokData: { ...tiktokData, viewCount: undefined },
          user: tiktokUser,
          liveRequestError,
        })
      ).toEqual(
        `🔴 ¡Adri Kraj está transmitiendo En Vivo! \n\n 🔗 Entra a: https://tiktok.com/@00909309490340983/live \n\n 🕒 Comenzó a transmitir: 2/26/2023 11:35:00 AM \n\n 👥 Espectadores: 0`
      );
    });
  });
});
