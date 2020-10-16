const checkStreamDetails = require("./check-stream-details.request");

try {
  (async function(){
    let streamData = {}, time = '', date = '', viewers = '';
    const result = await checkStreamDetails('LdlC2mxYsmM')
        .then((data) => { time = data.time; date = data.date; viewers = data.viewers })
        .catch(error => console.log('error: ', error));
    // console.log(result);
  })();
} catch(e) {
  // console.log(e);
}