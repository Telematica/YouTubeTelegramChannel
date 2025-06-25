module.exports = {
  TIKTOK_URL: "https://www.tiktok.com",
  TIKTOK_REQUEST_HEADERS: {
    authority: "www.tiktok.com",
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
  TIKTOK_LIVE_HEADERS: {
    authority: "www.tiktok.com",
    method: "GET",
    scheme: "https",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    cookie:
      "_waftokenid=eyJ2Ijp7ImEiOiJ6Y2dGOGxwc25mb2ZabUdSOG1UUEs3Um9lVGNhZzJtYnFwcXlsbmZKMVE4PSIsImIiOjE3NTA4MjMyMTUsImMiOiJwQUl1Y0RtMy9GMW9UaGdncmxwRnZNRGdkZGhGRUVCQjZkdXA2S1FZbWtRPSJ9LCJzIjoidUliT01DSGVkUFpnNDg3c1pXTlhYcjJoUUdQMVJPek9ndVg2QXdVcEl5MD0ifQ; _ttp=28rhBLpPoYhFpoj4LpaAuCD670S; uid_tt_ss=590c893bc594028179550cb90a207478c4cd6306bf582b3e6571088e91bf2a41; sessionid_ss=7904052287ec5627da97e3022acf526b; tt_chain_token=K6vpPa7tkLhdvC4UrUOSog==; tiktok_webapp_theme=dark; uid_tt=590c893bc594028179550cb90a207478c4cd6306bf582b3e6571088e91bf2a41; sid_tt=7904052287ec5627da97e3022acf526b; sessionid=7904052287ec5627da97e3022acf526b; store-country-code=mx; store-country-code-src=uid; tt-target-idc=useast1a; _ga=GA1.1.150568269.1736964914; store-idc=alisg; sid_guard=7904052287ec5627da97e3022acf526b%7C1749530522%7C15552000%7CSun%2C+07-Dec-2025+04%3A42%3A02+GMT; sid_ucp_v1=1.0.0-KDA2OTJiMjBkMjUwMTI0MzlmOWY4OTI1YTBkNjY5ZTA1OTdlYmFlMjUKIgiFiMagxKmvxl4Qmu-ewgYYswsgDDCx-7L0BTgEQOoHSAQQAxoGbWFsaXZhIiA3OTA0MDUyMjg3ZWM1NjI3ZGE5N2UzMDIyYWNmNTI2Yg; ssid_ucp_v1=1.0.0-KDA2OTJiMjBkMjUwMTI0MzlmOWY4OTI1YTBkNjY5ZTA1OTdlYmFlMjUKIgiFiMagxKmvxl4Qmu-ewgYYswsgDDCx-7L0BTgEQOoHSAQQAxoGbWFsaXZhIiA3OTA0MDUyMjg3ZWM1NjI3ZGE5N2UzMDIyYWNmNTI2Yg; delay_guest_mode_vid=5; _tea_utm_cache_1988={%22utm_source%22:%22edm_notice%22%2C%22utm_campaign%22:%22emailrecall%22}; _tea_utm_cache_594856={%22utm_source%22:%22edm_notice%22%2C%22utm_campaign%22:%22emailrecall%22}; _tea_utm_cache_548444={%22utm_source%22:%22edm_notice%22%2C%22utm_campaign%22:%22emailrecall%22}; _tea_utm_cache_345918={%22utm_source%22:%22edm_notice%22%2C%22utm_campaign%22:%22emailrecall%22}; FPID=FPID2.2.r%2BC8NhaR923vMHy1%2FJKk8qyj9zLh0IviUwjck7YX5os%3D.1736964914; FPAU=1.2.950766043.1750643419; _fbp=fb.1.1750643418758.1058180869; tt_csrf_token=ZSxOrETC-SQvJ41fezs2kjqCIxBHPhM_GU_Y; perf_feed_cache={%22expireTimestamp%22:1750892400000%2C%22itemIds%22:[%227512245060465855766%22%2C%227514799855009533189%22%2C%227504656711223938326%22]}; passport_fe_beating_status=true; odin_tt=b858f3fd7bcd3b0f9f6fc6f89df2a80e7b2b91e34bf6ea9b07cbfe212c99778ae2141a08fe22983be4edb4f42471cce4b1a1b30f9f1d97a1b0ca4ff57e9fdbdb8ac7dc879502fa6daafea4659e513fcb; s_v_web_id=verify_mc9ql009_8cuilR8F_U5Eb_4MjN_8R40_yKzplLHWqGSZ; tiktok_webapp_theme_source=dark; FPLC=EU8cXX%2FC0ZDiMFJoyyrK1oyPT5p7jLtwXXI9j%2FTKO%2F8G2jTdIVYquD3l5MaxIAllI2QJXuJ2KLtXUhROz7MO6rkZb7J5z6yqIrGHXtpLM5LVAgLg9ZuWxXZKRXDGbQ%3D%3D; ttwid=1%7CAezx0eMF_KYLqUOCB5wJSfxheONU3ApwvQrVgshX6dY%7C1750823393%7C8266581acb5fb8dea5ec9c3a5f2053f6d2aa6a53741d63a69e635146d27cb059; store-country-sign=MEIEDLcB84pgqxedHcxWFQQgmiwztEJ-ucU8u_Xmt6fHyETULuPte76tEfg9lH9AYtMEEFJdf7kTmINidQv4WQ69Xsg; _ga_LWWPCY99PB=GS1.1.1750822290.4.1.1750823400.0.0.1284965839; msToken=_3ljbnJxyGMjY6ufQZsGKzBMDxY8CNwK3wn5gajNUMvCmNfxtZDS32wsRF1-sBD-Dwc00Mpd6lD-x4Y7NqJQsNvs4A0taYS_ADbpXDmX8d21nUIjppcW559i-zpDaY_H7nbUiekrvjf4yQema5HP0DgLhgs=; msToken=aC3TjREg2aqvygcOxqAkaRo1gx2WT2XfyNpd5OyoomD1u701aWipiTgZU7ta6kugebp7GT7Qo7aG3ByJYGZLZ65aLsgzbAADUW2PuIQXip5FOXcywRUgrtpra0cokAuNxneMx3mOfSA0YC_iBcxhrn-M7gU=",
    priority: "u=0, i",
    "sec-ch-ua":
      '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  },
  TIKTOK_LIVE_STATUSES: {
    LIVE: 2,
    OFFLINE: 4,
  },
};
