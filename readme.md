# Notify to your own Telegram Group or Channel if a YouTube Channel is Live

## Why Scrapping instead of YouTube Data API

- No API consumption required (which is great!).
  - Do not deal with API Limits (scrapping is free, isn't it?).

## Getting started

### Setup
```sh
$ yarn install
```

On the .env file (root)
```sh
API_TOKEN={your-telegram-bot-API-key}
COOOKIE={mock-cookie}
```

## Reference

- https://stackoverflow.com/questions/22310972/using-youtube-api-v3-to-tell-if-a-channel-has-a-live-stream?noredirect=1&lq=1
- https://developers.google.com/youtube/v3/live/docs/liveBroadcasts/list
- https://stackoverflow.com/questions/69337592/how-to-set-the-response-type-using-axios-with-javascript-and-jsdocs
- https://stackoverflow.com/questions/32454238/how-to-check-if-youtube-channel-is-streaming-live
- https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
- https://stackoverflow.com/questions/42706584/eslint-error-parsing-error-the-keyword-const-is-reserved
