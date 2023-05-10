/**
 * @description YouTube Live Data Type
 * @typedef  {object}                 TikTokLiveDataType
 * @property {string}                 uniqueId           Unique Id
 * @property {string=}                roomId             Room Id
 * @property {boolean}                live               live?
 * @property {string|null|undefined=} title              Live Title
 * @property {string=}                thumbnail          Thumbnail image url
 * @property {number=}                viewCount          View count
 * @property {number=}                liveSince          Live since
 */

/**
 * @typedef  {object}                           TikTokUserType
 * @property {string}      id                   User id
 * @property {string}      nickname             Nickname
 * @property {string|null} [unique_id]          User unique id
 * @property {number}      disable_notification Disable Notification
 */

/**
 * @typedef  {object}  TikTokTransmissionType
 * @property {string}  id             Transmission id
 * @property {?string} startTimestamp Start timestamp
 * @property {string}  channelId      Channel id
 */

exports.unused = {};
