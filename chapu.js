const request = require("request");
const querystring = require("querystring");
const apiToken = "1203069319:AAFVnR94MDe4OESZuzmj898H6fLKVyiL0Mc";
const data = querystring.stringify({
  chat_id: "31193701",
  text: `Prueba API 2`,
});
request(
  `https://api.telegram.org/bot${apiToken}/sendMessage?${data}`,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {

    }
    console.log(error,body);
  }
);
