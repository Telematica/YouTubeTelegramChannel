module.exports = {
  YOUTUBE_URL: "https://www.youtube.com",
  YOUTUBE_CHANNEL_URL: "https://www.youtube.com/channel",
  YOUTUBE_REQUEST_HEADERS: {
    authority: "www.youtube.com",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "x-client-data":
      "CI+2yQEIorbJAQjBtskBCKmdygEI0K/KAQi8sMoBCO21ygEIjrrKARi9usoBGJq+ygE=",
    "sec-fetch-site": "none",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document",
    "accept-language": "es-MX,es;q=0.9",
    cookie: process.env.COOKIE,
  },
  YOUTUBE_LIVE_HEADERS: {
    authority: "www.youtube.com",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "es-MX,es;q=0.9",
    cookie:
      "VISITOR_INFO1_LIVE=T1SF4zda-Sw; LOGIN_INFO=AFmmF2swRAIgQXORz8nJ9cguaG2qu6py36elqFw-sTzAoW_5CfBVf64CIBri5r71aIMFYjs7DpFv7d_et04aYqKbzuNSmUZBRikX:QUQ3MjNmekVyMkhGZHVnUWVkWWtlcVlrLVVWdzNpQVBXSGdQdHFieU4zZlVlRHZpczl3d0thbk1pSDYzQUJQRThsNUt5c1Y0eUJQdkFiU3FyR2pvYzA0YkZEd0NWNHdiOHJRYlJVU2Y2YV9NbDNiTEZyX3hHaDBhR2N5LXlYM2p1c29nTE1WRzR3YUNZRDZYYlpITXVUVzNFR0c4aUV2MzRn; NID=511=e8eoRdiqDztPAcrEVNABQBna3mh-2RgKnbBTCwJilHeDfwYt39HKngs91EH2TdLnIIhLvhykrr9NfjKyWI_6fi2Wt_SIhwMC6Nt12Tjb5gL6qIRC-AzUuCEFJa7yoz-wRHr0adMS_F7Dnhe_JIOJvqwKutbjKL30qzfOCb03gd0; HSID=ACbp2x0R8Y-FlW6aX; SSID=AjmVi9pWIqNRc9eNf; APISID=zzpwkQNNrHxxQOO2/A8mXX1qRq7PiPGsx9; SAPISID=gcPg8jl06aSZgo6j/AR-CXtf3OtkFyGNcC; __Secure-1PAPISID=gcPg8jl06aSZgo6j/AR-CXtf3OtkFyGNcC; __Secure-3PAPISID=gcPg8jl06aSZgo6j/AR-CXtf3OtkFyGNcC; DEVICE_INFO=ChxOekU0TnpZek9UZ3lOemd6TURrMk16STFNZz09ENfA/p0GGNfA/p0G; SID=TggmYnJakhgrrN8wSHcWxCoDu2onwa8LUT7CV__Eg3HaZ0YUFH0RIwFLGxao7o4B-JEmhw.; __Secure-1PSID=TggmYnJakhgrrN8wSHcWxCoDu2onwa8LUT7CV__Eg3HaZ0YUzZlIAx_Im4HRGri2hRjD7g.; __Secure-3PSID=TggmYnJakhgrrN8wSHcWxCoDu2onwa8LUT7CV__Eg3HaZ0YU7lFU4EqsosyiO4Dxa2kNMQ.; PREF=f6=40000080&tz=America.Mexico_City&f5=30000&volume=35&f7=150&f4=4000000; YSC=zvsk7oPlMx4; SIDCC=AFvIBn-vWNIt1lMoLt_bDFJPRxDHVpXxHkYqIyG0dSZOa1wvcS_A5YnTyy73N7BfakPHAWwtXnic; __Secure-1PSIDCC=AFvIBn88ADoyc91qT6IiG3vmISae8wVBz9tSRIueyc_tofXYcsagEsavvP7e2CjsU4tIKJuuIr9_; __Secure-3PSIDCC=AFvIBn9IwUKWyXbJAwH0C8Otoe2h7URrsHhCr8xeIkb6gZpmrPSxfEza1hf2L5_EDXB5pAprXUED",
    "sec-ch-ua":
      '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    "sec-ch-ua-arch": "x86",
    "sec-ch-ua-bitness": "64",
    "sec-ch-ua-full-version": "110.0.5481.100",
    "sec-ch-ua-full-version-list":
      '"Chromium";v="110.0.5481.100", "Not A(Brand";v="24.0.0.0", "Google Chrome";v="110.0.5481.100"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "",
    "sec-ch-ua-platform": "macOS",
    "sec-ch-ua-platform-version": "13.1.0",
    "sec-ch-ua-wow64": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "service-worker-navigation-preload": true,
    "upgrade-insecure-requests": 1,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "x-client-data":
      "CIW2yQEIorbJAQjBtskBCKmdygEIgf7KAQiWocsBCPj1zAEI9IvNAQiIjM0BCJyNzQEI0o3NAQi5kc0BCM+RzQEIjJPNAQjS4awC",
  },
  YOUTUBE_CHANNELS: [
    {
      id: "UCvzHrtf9by1-UY67SfZse8w",
      name: "Gobierno de México",
    },
    {
      id: "UCUqetMbryrT0yMpokrUDJgg",
      name: "Sin Censura TV",
      channel: "SinCensuraTVMedia",
    },
    {
      id: "UCxEgOKuI-n-WOJaNcisHvSg",
      name: "Andrés Manuel López Obrador",
    },
    {
      id: "UCNQqL-xd30otxNGRL5UeFFQ",
      name: "GFNorona Oficial - Gerardo Fernández Noroña",
    },
    {
      id: "UCegfUb76P-zysNAoaDRMC9Q",
      name: "El Chapucero USA",
    },
    {
      id: "UC-KsqnbQAR_3XMaJBk5CUZQ",
      name: "El Chapucero TODAY",
    },
    {
      id: "UCxIM-_g0jz9DG7dCdxmyrHg",
      name: "Chapucero Network",
    },
    {
      id: "UCcWFzlAzYkURynPFlV9KWZg",
      name: "El Chapucero",
    },
    {
      id: "UCRja7nxirrJ4yEUa9pPkFmw",
      name: "Julio Astillero",
    },
    {
      id: "UCt7k7y_xTkkc1Jeh7cdAjDQ",
      name: "SinEmbargo Al Aire",
    },
    {
      id: "UCBdM6w8S6kn90P0or3Z0kxQ",
      name: "RompevientoTV",
    },
    {
      id: "UCrQNcN2YrmWjoPFZYQNlpmQ",
      name: "Política Piñata",
    },
    {
      id: "UC_MbFb0fBPURLVJ5H5XbGQw",
      name: "Mau Rodriguez",
    },
    {
      id: "UCCHoKlb5YIiN2ZPDD_jqXlw",
      name: "Pueblo Informado",
    },
    {
      id: "UC2N6_cvCmlCohKmVFKEBaug",
      name: "Sin Línea Mx",
    },
    {
      id: "UCoeJxDc717MNVJtUsQW20Qg",
      name: "Senado de México",
    },
    {
      id: "UCkLEVSsqQSCZ8pnyiLyGn3w",
      name: "Cámara de Diputados",
    },
    {
      id: "UCvASv4hWCpTTbeEU67jkEzA",
      name: "Noticiero en Redes",
    },
    {
      id: "UCmoHmtwGF6XAZfSI1S2PkTg",
      name: "Meme Yamel",
    },
    {
      id: "UCE0jLtnLnVG9xLyoR-r_jXg",
      name: "Nino Canún",
    },
    {
      id: "UCPC0Z_lxVz4o-NMPHMoDMlA",
      name: "Con Toño Ruiz",
    },
    {
      id: "UCu2Uc7YeJmE9mvGG9OK-zbQ",
      name: "Secretaría de Salud México",
    },
    {
      id: "UCKIVcWfT68v6yiWjbLr8uKw",
      name: "GobCDMX",
      channel: "GobCDMX",
    },
    {
      id: "UCXodhnJahy40Brs8pi7KoUQ",
      name: "Iber Alejandro",
      channel: "YEIPIMARTNEZIBERALEJANDRO",
    },
    {
      id: "UCDaSJHXF1JK9vOeYHwuseNw",
      name: "Buzón Ciudadano",
      channel: "buzonciudadanomx",
    },
    {
      id: "UCZd-6H5UnqzwqiedUYCD2Kg",
      name: "Campechaneando",
      channel: "Campechaneando",
    },
    {
      id: "UCb9OjVjHD-SrV852rdQyByQ",
      name: "El Caporal En Vivo",
      channel: "VlogsdeElCaporal",
    },
    {
      id: "UCUF37fUphmbJmor8ALRJzuQ",
      name: "Hans Salazar Oficial",
      channel: "2412hans",
    },
    {
      id: "UC0tE4QuonBXjuUzZlZav8PA",
      name: "Rata Política",
      channel: "RataPoliticaReportera",
    },
    {
      id: "UC0R4smsFydUrF_vK9ziR80A",
      name: "Sin Censura Media",
      channel: "sincensuraMedia",
    },
    {
      id: "UCrbK2ykRa2e3DHuyDcqSYxg",
      name: "Al Viruela Media",
      channel: "AlViruelaMedia",
    },
    {
      id: "UCJL2rYbSTWNY6R_NVyfdeuA",
      name: "Eli Tv Oficial",
      channel: "EliTvOficial",
    },
    {
      id: "UCm1zWwbdLPk99KwqOralv6A",
      name: "BENDITAS REDES SOCIALES",
      channel: "BENDITASREDESSOCIALES",
    },
    {
      id: "UCIFMR2wH-tYMT-Uq5kgAvFQ",
      name: "El Chapucero EN VIVO",
      channel: null,
    },
    {
      id: "UCPX3yijEA2s1jTJGDlUnGsQ",
      name: "Rafa Herrera",
      channel: "RafaHerrera",
    },
    {
      id: "UCcNxmMVK_S2zzdb5qd77ESQ",
      name: "Radio Bufalo MX",
      channel: "RadioBufaloMX",
    },
    {
      id: "UClfxfOThZDPL_c0Ld7psDsw",
      name: "CONFERENCIAS EXCLUSIVAS Alfredo Jalife",
      channel: "CONFERENCIASEXCLUSIVASAlfredoJalife",
    },
  ],
};
// {"browseId":"UClfxfOThZDPL_c0Ld7psDsw","canonicalBaseUrl":"/c/CONFERENCIASEXCLUSIVASAlfredoJalife"}
