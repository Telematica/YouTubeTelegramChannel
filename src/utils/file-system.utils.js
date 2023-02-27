// @ts-check
const fs = require("fs");

/**
 * @function
 * @description Open and retrieve log file contents as an Array of any
 * @param {{logFileDirectory: string, logFilename: string}} params
 * @returns {Array<any>} Array of any
 */
function openOrCreateLogFile({ logFileDirectory, logFilename }) {
  /** @type {string} */
  let rawLogObj = "";

  /** @type {string} */
  const fullPathFile = `${logFileDirectory}/${logFilename}`;

  if (fs.existsSync(fullPathFile)) {
    rawLogObj = fs.readFileSync(fullPathFile).toString();
  } else {
    fs.writeFile(fullPathFile, "[]", (err) => {
      if (err) throw err;
      console.log("Log file was succesfully created!");
    });
  }
  return JSON.parse(rawLogObj || "[]");
}

/**
 * @function
 * @description Open and write error log file
 * @param {{error: unknown, logFormattedDate: string, errorLogFileDirectory: string, errorLogFileExtension: string}} error Caught Error
 * @returns {void}
 */
function openOrCreateAndWriteErrorLogFile({ 
  error,
  logFormattedDate,
  errorLogFileDirectory,
  errorLogFileExtension
}) {
  /** @type {string} */
  const errorLogFilename = `${logFormattedDate}${errorLogFileExtension}`;

  /** @type {string} */
  const fullPathFile = `${errorLogFileDirectory}/${errorLogFilename}`;

  if (fs.existsSync(fullPathFile)) {
    fs.appendFile(fullPathFile, String(error), () => { });
  } else {
    fs.writeFile(
      fullPathFile,
      String(error) + " : " + new Date(),
      (err) => {
        if (err) throw err;
        console.log("Error log saved!");
      }
    );
  }
}

module.exports = {
  openOrCreateLogFile,
  openOrCreateAndWriteErrorLogFile
};
