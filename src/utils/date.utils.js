/**
 * @description Get Year-Month-Day Formatted String.
 * @param {Date} date Date object
 * @returns {string} Example output: 2023-02-23
 */
function getYearMonthDayString(date) {
  return (
    String(date.getFullYear()) +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

module.exports = {
  getYearMonthDayString,
};
