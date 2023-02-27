const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const telegramSendMessage = require("../../src/requests/telegram-send-message.request");

jest.mock('axios');

beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
})

describe('pingChannelStreamLive Request', () => {
  test('Successful GET response contents', async () => {
    const mockResponse = {};
    // @ts-ignore
    axios.get.mockResolvedValueOnce(Promise.resolve(mockResponse));
    const response = await telegramSendMessage({ chat_id: 1234, text: "Test message" });
    expect(response).toEqual(mockResponse);
  });

  test('Unsuccessful GET reject value in case of an error', async () => {
    const err = new Error('Server error.');
    // @ts-ignore
    axios.get.mockRejectedValueOnce(err);
    try {
      await telegramSendMessage({ chat_id: 1234, text: "Test message" });
    } catch (e) {
      expect(e).toEqual(err);
    }
  });
});
