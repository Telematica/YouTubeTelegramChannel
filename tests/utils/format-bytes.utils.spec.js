
const { formatBytes } = require("../../src/utils/format-bytes.utils");

describe('format-bytes.utils Functions', () => {
  test('formatBytes behavior', async () => {
    expect({
      noDecimals: formatBytes(123456789, -1),
      decimals: formatBytes(123456789, 3),
      zero: formatBytes(0),
      bytes1: formatBytes(1),
      bytes2: formatBytes(1023),
      kilobytes: formatBytes(1024),
      megabytes: formatBytes(1024000000),
      gigabytes: formatBytes(1000000000000),
      terabytes: formatBytes(10000000000000),
      petabytes: formatBytes(10000000000000000),
      exabytes: formatBytes(10000000000000000000),
      zetabytes: formatBytes(10000000000000000000000),
      yotabytes: formatBytes(10000000000000000000000000)
    }).toEqual({
      decimals: "117.738 MB",
      noDecimals: "118 MB",
      zero: "0 Bytes",
      bytes1: "1 Bytes",
      bytes2: "1023 Bytes",
      kilobytes: "1 KB",
      megabytes: "976.56 MB",
      gigabytes: "931.32 GB",
      terabytes: "9.09 TB",
      petabytes: "8.88 PB",
      exabytes: "8.67 EB",
      zetabytes: "8.47 ZB",
      yotabytes: "8.27 YB"
    });
  });
  test('formatBytes behavior: wrong type (string)', async () => {
    //@ts-expect-error
    expect(() => formatBytes("Hi all!")).toThrow(new TypeError("No float type allow."));
  });
});
