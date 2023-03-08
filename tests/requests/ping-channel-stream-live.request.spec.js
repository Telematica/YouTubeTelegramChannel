const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const pingChannelStreamLive = require("../../src/requests/ping-channel-stream-live.request");

jest.mock('axios');

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
})

describe('pingChannelStreamLive Request', () => {
  test('Successful GET html contents', async () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../../src/mock/html/stream.mock.html'), 'utf8');
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(html));
    const response = await pingChannelStreamLive("channelId");
    expect(response).toEqual(html);
  });

  test('Successful GET html contents using a Channel Vanity URL', async () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../../src/mock/html/stream.mock.html'), 'utf8');
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(html));
    const response = await pingChannelStreamLive("@channelId");
    expect(response).toEqual(html);
  });

  test('Unsuccessful GET reject value in case of an error', async () => {
    const err = new axios.AxiosError('Server error.');
    // @ts-ignore
    axios.get.mockRejectedValueOnce(err);
    try {
      await pingChannelStreamLive("channelId");
    } catch (e) {
      expect(e).toEqual(err);
      // @ts-ignore
      expect(e.isAxiosError).toEqual(true);
    }
  });
  test('Unsuccessful GET reject value in case of an error 2', async () => {
    const err = new Error("Generic error");
    // @ts-ignore
    axios.get.mockRejectedValueOnce(err);
    try {
      await pingChannelStreamLive("channelId");
    } catch (e) {
      expect(String(e)).toEqual("Error: "+err.message);
    }
  });
});
