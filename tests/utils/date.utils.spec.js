const { getYearMonthDayString } = require("../../src/utils/date.utils");

describe('date.utils Functions', () => {
  test('getYearMonthDayString behavior: returns formatted date', async () => {
    const today = new Date("2022-12-12 00:00:00");
    const str = getYearMonthDayString(today);
    expect(str).toEqual("2022-12-12");
  });

  test('getYearMonthDayString behavior: returns date before 1970', async () => {
    const randomDate = new Date("1000-07-08 00:00:00");
    const str = getYearMonthDayString(randomDate);
    expect(str).toEqual("1000-07-08");
  });
});
