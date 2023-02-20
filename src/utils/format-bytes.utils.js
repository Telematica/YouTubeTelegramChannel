/**
 * Format bytes to Human Readable string
 * Examples: 1023 B, 45.6 KB, 78.901 MB, 234.56789 TB
 *
 * @param {number} bytes
 * @param {number} decimals
 * @returns {string}
 */

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  /** @type {number} */ 
  const k = 1024;

  /** @type {number} */
  const dm = decimals < 0 ? 0 : decimals;

  /** @type {Array<string>} */
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  /** @type {number} */
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

module.exports = formatBytes;
