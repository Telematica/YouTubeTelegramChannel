const Perf = require("../../src/utils/performance.utils");

describe("Perf Class", () => {
  test("getMemoryUsage() method should contain memory related values", async () => {
    const perf = new Perf();
    const memoryUsage = perf.begin().getMemoryUsage();
    expect(memoryUsage).toBeDefined();
    expect(memoryUsage).toHaveLength(5);
    expect(memoryUsage[0]).toHaveProperty("key", "rss");
    expect(memoryUsage[0]).toHaveProperty("value");
    expect(memoryUsage[1]).toHaveProperty("key", "heapTotal");
    expect(memoryUsage[1]).toHaveProperty("value");
    expect(memoryUsage[2]).toHaveProperty("key", "heapUsed");
    expect(memoryUsage[2]).toHaveProperty("value");
    expect(memoryUsage[3]).toHaveProperty("key", "external");
    expect(memoryUsage[3]).toHaveProperty("value");
    expect(memoryUsage[4]).toHaveProperty("key", "arrayBuffers");
    expect(memoryUsage[4]).toHaveProperty("value");
  });
  test("begin() method should set timing values", async () => {
    const perf = new Perf();
    perf.begin();
    expect(perf.start).toBeInstanceOf(Date);
    expect(perf.hrstart).toEqual(expect.arrayOf(expect.any(Number)));
  });
  test("finish() method should set timing values", async () => {
    const perf = new Perf();
    perf.begin().finish();
    expect(perf.end).toEqual(expect.any(Number));
    expect(perf.hrend).toEqual(expect.arrayOf(expect.any(Number)));
  });
  test("getStats() method should return performance statistics object", async () => {
    const perf = new Perf();
    const stats = perf.begin().finish().getStats();
    expect(stats).toEqual(expect.objectContaining({
      memoryUsage: expect.any(Object),
      executionTime: expect.any(Object),
    }));
  });
  test("showStats() method should return performance statistics object", async () => {
    const consoleInfo = jest.spyOn(console, 'info').mockImplementation();
    const perf = new Perf();
    perf.begin().finish().showStats();
    expect(consoleInfo).toHaveBeenCalledTimes(3); 
  });
});
