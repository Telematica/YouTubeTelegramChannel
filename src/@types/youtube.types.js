/**
 * @description YouTube Live Data Type
 * @typedef  {object}                 YouTubeLiveDataType
 * @property {string}                 cid                Channel Id
 * @property {string|null|undefined=} vid                Video Id
 * @property {boolean}                live               live?
 * @property {boolean=}               configured         configured?
 * @property {string|null|undefined=} title              Live Title
 * @property {string=}                thumbnail          Thumbnail image url
 * @property {string=}                scheduledStartTime Scheduled Start time
 * @property {string=}                actualStartTime    Actual Start time
 * @property {number=}                viewCount          View count
 * @property {string=}                liveSince          Live since
 */

/**
 * @typedef  {object}      YouTubeChannelType
 * @property {string}      id        Channel id
 * @property {string}      name      Channel name
 * @property {string|null} [channel] Channel
 */

/**
 * @typedef  {object}  YouTubeTransmissionType
 * @property {string}  id             Transmission id
 * @property {?string} startTimestamp Start timestamp
 * @property {string}  channelId      Channel id
 */

exports.unused = {};
