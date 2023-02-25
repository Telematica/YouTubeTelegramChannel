require('dotenv').config({path:__dirname+'/.env'});
const checkStreamDetails = require("../check-stream-details.request");
const sendMessage = require("../legacy/send-message.request");

try {
  (async function(){
    await sendMessage({
      chat_id: "31193701",
      text: `🔴 test!`,
    });
  })();
} catch(e) {
  console.log(e);
}
