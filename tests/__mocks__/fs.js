"use strict";

const path = require("path");
const fs = jest.createMockFromModule("fs");

// Reference: https://jestjs.io/docs/manual-mocks#mocking-node-modules
// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.

let mockFiles = Object.create(null);

/**
 * @function
 * @description Set the mock files for the mocked out `fs` module.
 * @param {Object} newMockFiles - An object representing the mock files and their contents.
 */
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

/**
 * @function
 * @description A custom version of `readdirSync` that reads from the special mocked out file list set via __setMockFiles
 * @param {string} directoryPath - The path to the directory to read.
 * @returns {Array<string>} An array of file names in the directory.
 */
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

/**
 * @function
 * @description A custom version of `existsSync` that checks if a file exists in the mocked file system.
 * @param {string} directoryPath - The path to the file or directory to check.
 * @returns {boolean} Returns true if the file or directory exists, false otherwise.
 */
function existsSync(directoryPath) {
  if (directoryPath in mockFiles) {
    return true;
  }
  return false;
}

/**
 * @function
 * @description A custom version of `appendFile` that simulates appending to a file in the mocked file system.
 * @param {string} file - The path to the file to append to.
 * @param {string} log - The log content to append to the file.
 * @param {function} callback - The callback function to call after appending.
 * @throws {Error} Throws an error if the file does not exist in the mocked file
 * @returns {void} Calls the callback with no arguments if the file exists, or with an error if it does not.
 */
function appendFile(file, log, callback) {
  if (file in mockFiles) {
    callback();
  } else {
    callback(new Error("File does not exist"));
  }
}

/**
 * @function
 * @description A custom version of `writeFile` that simulates writing to a file in the mocked file system.
 * @param {string} file - The path to the file to write to.
 * @param {string} content - The content to write to the file.
 * @param {function} callback - The callback function to call after writing.
 * @throws {Error} Throws an error if the file does not exist in the mocked file
 * @returns {void} Calls the callback with no arguments if the file exists, or with an error if it does not.
 */
function writeFile(file, content, callback) {
  callback();
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.existsSync = existsSync;
fs.appendFile = appendFile;
fs.writeFile = writeFile;

module.exports = fs;
