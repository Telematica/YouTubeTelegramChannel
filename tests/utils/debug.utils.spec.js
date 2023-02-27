// https://dev.to/zirkelc/how-to-test-console-log-5fhd
const { showDebugInfo } = require("../../src/utils/debug.utils");

describe('debug.utils Functions', () => {
  test('showDebugInfo behavior: returns correct data outputs', async () => {
    const logSpy = jest.spyOn(global.console, 'log');
    showDebugInfo(process.env);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    // expect(logSpy).toHaveBeenCalledWith("");
    // expect(logSpy.mock.calls).toContainEqual(["some other message"]);
    logSpy.mockRestore();
  });
});
