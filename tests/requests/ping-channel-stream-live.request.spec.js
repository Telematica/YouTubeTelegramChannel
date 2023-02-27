//@ts-check
const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const pingChannelStreamLive = require("../../src/requests/ping-channel-stream-live.request");

jest.mock('axios');

beforeEach(() => {
  axios.get.mockClear();
})

test('Successful GET html contents', async () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../../src/mock/html/stream.mock.html'), 'utf8');
  axios.get.mockResolvedValueOnce(Promise.resolve(html));
  const response = await pingChannelStreamLive("channelId");
  expect(response).toEqual(html);
});

test('Unsuccessful GET reject value in case of an error', async () => {
  const err = new Error('Server error.');
  axios.get.mockRejectedValueOnce(err);
  try {
    await pingChannelStreamLive("channelId");
  } catch (e) {
   expect(e).toEqual(err);
  }
});
