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
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    cookie:
      "_ttp=2F5aXrN3qybBtdt3rsMrCzcukkw; tt_csrf_token=nsssN91h-EDnV2Iew9HeYaV-8SU4nw_gEFk8; csrf_session_id=deeb4e0f476af95b994b8c9f304001cb; tiktok_webapp_theme=light; passport_csrf_token=3df33a396b3a209ead1bb76d6ebd3aee; passport_csrf_token_default=3df33a396b3a209ead1bb76d6ebd3aee; s_v_web_id=verify_lfaf3u8a_FETiT1kW_reM2_4Axh_95wz_HS1wL6KhJMe4; cmpl_token=AgQQAPPdF-RO0o6yU-vMI108_ml90oTQv4fNYMlhvQ; uid_tt=96e972c55b7417c6669745ebaa302e63aa120307adbecafd9e54f3e8d6f4efce; uid_tt_ss=96e972c55b7417c6669745ebaa302e63aa120307adbecafd9e54f3e8d6f4efce; sid_tt=5c6a3402b1daa3022125c6bab9e76aa1; sessionid=5c6a3402b1daa3022125c6bab9e76aa1; sessionid_ss=5c6a3402b1daa3022125c6bab9e76aa1; store-idc=maliva; store-country-code=mx; store-country-code-src=uid; tt-target-idc=useast1a; tt-target-idc-sign=U25-XRyro2KgMKLXMoUH0Mjy0TQHN-q5ktD5pIRtST47ue1x1QCFOZlTxCdDpRalPtmTfRL4pTWm_8j_cKbeLn1epy2SIFEY1xwGuZdMZRCRI81Pu1GvArxJjWYxIrImaFJ0ZMgTmRFhEBiXnRAU1zfZrw-C9x1nPCZFWz68CregEvL7j0SxHpXT6uhipAeYxwqagVEwLksvBTKZSmKJqoah_yKvtrlOiqg8MglljoD3Ea5Q8ZHLzAxL3_ZJo8Df1FzBFIEIrQNfEcJqACUlE7uCIMtlHg1iQ-onuIIQ3LGBVbLywvOVOdIpSAe6W1wU5PFzrrNNoN2us8RCgd2_mOAp2oPgSG1srp5_zDGff4X9n83xLpnZNQisOdcNbqYHxXW73BWI5Lw17JKPRZC7_0fTaYK7ubUQYqHpl_SJfT3_m-koLO1NpRYWadl1duI3EiqlTX7sT61CnRvFgLtvL1GtDdKUHk4xqc51gOYiblH-ieGbUPNO-J8tCZidtZdu; _abck=804A83DCCDC17C7E53ED380C989DE83B~0~YAAQpyXIF2h77tiGAQAA9RlZ7QlYdrD+SCQsX8ekwMdOj6WpuMbDCbzWN0BKWDCOHWXaTmLHRTXacWmAPhBlES9G0U/+PFzu7v3eT7sIRJBkdEZ3emVbXDPJP16ep2dl+0ZmpvwKfbrHmoYetQ9Mm/EoFzZKDxvnlBomdhz9fZoLHmiNSJQsCla7KyaarfkpK0sX3OfpoRChg3PAM0DTD2TpT8KNDtUEbzDq5TN+K+58MvckmJ8OXDTZLMJnIIist9B5nU3DBFkOjiFxlLN6ZyGl5k3HQvjt/RCyonZUCaOhF7rwiKW29HuCXlv7KcatbjOsnMYwYsGtEn9J8y3VJplr3kfTjTTHQlslzd7zqcdOrkv0Fra7p6JXVb0TVh6zWXqfQhoDBh/nX9O5QMmWvqYB3lpztYJB~-1~-1~-1; csrfToken=8HaYvHOL-goM-fLw-C_5XhFpTrA4RmKupRrA; passport_fe_beating_status=true; __tea_cache_tokens_1988={%22user_unique_id%22:%227208262859351885317%22%2C%22timestamp%22:1682360072589%2C%22_type_%22:%22default%22}; sid_guard=5c6a3402b1daa3022125c6bab9e76aa1%7C1682360073%7C15552000%7CSat%2C+21-Oct-2023+18%3A14%3A33+GMT; sid_ucp_v1=1.0.0-KDM3NmEwODNlYTAzMTlhMzk5Y2RhODM5MmZhYzA0YzRkMjQ2NWZmNzkKIAiFiMagxKmvxl4QiY6bogYYswsgDDCx-7L0BTgEQOoHEAMaBm1hbGl2YSIgNWM2YTM0MDJiMWRhYTMwMjIxMjVjNmJhYjllNzZhYTE; ssid_ucp_v1=1.0.0-KDM3NmEwODNlYTAzMTlhMzk5Y2RhODM5MmZhYzA0YzRkMjQ2NWZmNzkKIAiFiMagxKmvxl4QiY6bogYYswsgDDCx-7L0BTgEQOoHEAMaBm1hbGl2YSIgNWM2YTM0MDJiMWRhYTMwMjIxMjVjNmJhYjllNzZhYTE; tt_chain_token=t7Bq0bt0BUjlmg9vsjzHgg==; ttwid=1%7C9oqRTOHxkcbLu2xfontcMsI6QQ6eP27Aoa49fcA0Urc%7C1683061303%7C9002f0d9dca391f94d085963d10ab773652656914dccc240ca22976a35d73816; odin_tt=5bfd009dc64b9c6069d24cc94f9a5e591143ceb40804978ee0addf71f10d9253cce0b17c487b9f1d4163188a6b8cbd80759e58349e8239b054b2af009c00d392a11881f52c366bbf7148d12e9002f23d; msToken=NUunJE_Vzee9hsH9dEt4BPcZob180hkjYHTXgq63dh7iDSsbeHfoOCSGKAlEDr8yYJ4uzzjJ3ACTmU8QGQEkuWzYDjbVQSkHNJflBKSU7ZNdzhzjWUh4nCpBjrKbZxGB1JulpHgsc2LZtXE2; msToken=NUunJE_Vzee9hsH9dEt4BPcZob180hkjYHTXgq63dh7iDSsbeHfoOCSGKAlEDr8yYJ4uzzjJ3ACTmU8QGQEkuWzYDjbVQSkHNJflBKSU7ZNdzhzjWUh4nCpBjrKbZxGB1JulpHgsc2LZtXE2",
    "sec-ch-ua":
      '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
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
  TIKTOK_LIVE_STATUSES: {
    LIVE: 2,
    OFFLINE: 4
  },
};
