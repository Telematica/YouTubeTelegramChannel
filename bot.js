//https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
require('dotenv').config({path:__dirname+'/.env'});
const fs = require('fs');
const request = require("request");
const querystring = require("querystring");
const checkStreamDetails = require("./check-stream-details.request");
const checkIfLive = require("./check-stream-iflive.request");
const sendMessage = require("./send-message.request");
const formatBytes = require("./format-bytes.utils");
var os = require("os");
const { CHANNELS } = require('./constants');

console.log(process.env.API_TOKEN, process.env.TZ, new Date(), new Date().toLocaleTimeString());

try {
  (async () => {
    let logDate = new Date();
    let logFilename = String(logDate.getFullYear()).padStart(2,0)+"-"+String(logDate.getMonth()+1).padStart(2,0)+"-"+String(logDate.getDate()).padStart(2,0)+".log.json";
    let rawLog = null;

    if (fs.existsSync(__dirname + `/logs/${logFilename}`)) {
      rawLog = fs.readFileSync(__dirname + `/logs/${logFilename}`);
    } else {
      fs.writeFile(logFilename, "[]", (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
      }); 
    }

    console.log(logFilename);
    var start = new Date(), hrstart = process.hrtime();
    let logEntry = [];
    
    for (const channel of CHANNELS) {
      log = JSON.parse(rawLog || "[]");  
      let streamData = {}, time = '', date = '';
      await checkIfLive(channel.id).then((data) => streamData = data);
      console.log(streamData);
      if (!streamData.success) {
        console.log('¡Hubo un Error en la Petición al Canal!');
        logEntry.push({ error: '¡Hubo un Error en la Petición al Canal!', date: new Date() });
      }
    
      if (!streamData.isLive && streamData.success) {
        console.log('El Canal no está en vivo');
        logEntry.push({error: `El Canal no está en vivo: ${channel.name}: ${channel.id}`, date: new Date() });
      }
    
      if (streamData.isLive) {
        let rawdata = fs.readFileSync(__dirname + '/streams.json');
        let transmissions = JSON.parse(rawdata);
        let video = transmissions.find(t => t.id === streamData.videoId);
        if (video) {
          console.log(`Esta transmisión ya fue notificada: ${streamData.videoId} - ${channel.name}: ${channel.id}`);
          logEntry.push({ error: `Esta transmisión ya fue notificada: ${streamData.videoId} - ${channel.name}: ${channel.id}`, date: new Date() });
        } else {
          await checkStreamDetails(streamData.videoId).then((data) => { time = data.time; date = data.date; });
    
          transmissions.push({
            "id": streamData.videoId,
            "startTimestamp": date,
            "channelId": `${channel.id}`
          });
          logEntry.push({success: `¡Transmisión Notificada! : ${streamData.videoId} - ${channel.name}: ${channel.id}`, date: new Date() });
          fs.writeFileSync(__dirname + '/streams.json', JSON.stringify(transmissions, null, 2));
          await sendMessage({
            chat_id: "@SinCensuraMedia",
            text: `🔴 ¡${channel.name} está transmitiendo En Vivo! Entra a: https://www.youtube.com/watch?v=${streamData.videoId} \n Comenzó a transmitir a las: ${time}`,
          });
        }
      }
    }
    var end = new Date() - start, hrend = process.hrtime(hrstart);
    let memoryUsage = process.memoryUsage();
    memoryUsage = Object.keys(memoryUsage).map(item => {
      return { key: item, value: formatBytes(memoryUsage[item]) }
    });
    console.info('Execution time: %dms', end);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    console.info('Total Memory usage:', memoryUsage);
    logEntry.push({
      memoryUsage,
      executionTime: {
        'Execution time: %dms': end,
        'Execution time (hr): %ds %dms': `${hrend[0]} ${hrend[1] / 1000000}`
      },
    });
    log.push(logEntry);
    fs.writeFileSync(__dirname + `/logs/${logFilename}`, JSON.stringify(log, null, 2));
  })();
} catch (e) {
  let logFilename = String(logDate.getFullYear()).padStart(2,0)+"-"+String(logDate.getMonth()+1).padStart(2,0)+"-"+String(logDate.getDate()).padStart(2,0)+".error_log.json";
  if (fs.existsSync(__dirname + `/logs/${logFilename}`)) {
    fs.appendFile(__dirname + `/logs/${logFilename}`, e.toString());
  } else {
    fs.writeFile(logFilename, e.toString() + " : " + new Date(), (err) => {
      if (err) throw err;
      console.log("Error log saved!");
    }); 
  }
}
