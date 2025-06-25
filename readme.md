# Notify to your own Telegram Group or Channel if a YouTube Channel is Live

## Why Scrapping instead of YouTube Data API

- No API consumption required (which is great!).
  - Do not deal with API Limits (scrapping is free, isn't it?).

## Getting started
<br /> 

### Setup

<br /> 

#### Clone the repo
```sh
$ git clone https://github.com/Telematica/YouTubeTelegramChannel.git
```

#### Install dependencies (npm or yarn)
```sh
$ yarn install
```

#### On the .env file (root), input your Telegram Bot API token, and a mock cookie (optional)
```sh
API_TOKEN={your-telegram-bot-API-key}
COOOKIE={mock-cookie}
```

Make sure to create a log/ directory on @ root and an error/ subdirectory inside (log/errors)
```sh
|____logs/
| |____2023-02-19.log.json
| |____2023-02-18.log.json
| |____errors/
| |____2020-06-13.log.json
| |____2020-06-12.log.json
|____.gitignore
|____package.json
|____.env
|____tsconfig.json
|____.vscode
| |____settings.json
|____.eslintrc.json
|____src
| |____@types/
| |____constants/
| |____mock/
| |____utils/
| |____scrappers/
| |____requests/
| |____bot.js
| |____data/
|____LICENSE
|____.env.sample
|____jsdoc.json
|____tests/
| |____send-message-request.test.js
|____legacy/
|____.editorconfig
|____readme.md
|____yarn.lock
```
## Up and Running

### Execute the script. You will see debug output.
```sh
$ /path/to/node /Users/your-user/YouTubeTelegramChannel/src/bot.js
```

## Reference

- https://stackoverflow.com/questions/22310972/using-youtube-api-v3-to-tell-if-a-channel-has-a-live-stream?noredirect=1&lq=1
- https://developers.google.com/youtube/v3/live/docs/liveBroadcasts/list
- https://stackoverflow.com/questions/69337592/how-to-set-the-response-type-using-axios-with-javascript-and-jsdocs
- https://stackoverflow.com/questions/32454238/how-to-check-if-youtube-channel-is-streaming-live
- https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
- https://stackoverflow.com/questions/42706584/eslint-error-parsing-error-the-keyword-const-is-reserved


- https://github.com/gajus/eslint-plugin-jsdoc/issues/533
- https://eslint.org/docs/latest/use/configure/language-options#specifying-globals


- https://stackoverflow.com/questions/64648688/how-to-mock-sequelize-with-jest
