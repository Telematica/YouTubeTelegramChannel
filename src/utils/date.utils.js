/**
 * @description Get Year-Month-Day Formatted String
 * @param {Date} date
 * @returns {string}
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
