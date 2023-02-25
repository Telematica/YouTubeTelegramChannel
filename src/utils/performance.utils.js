// ts-check
const { formatBytes } = require("../utils/format-bytes.utils");

/**
* @class Perf
* @classdesc Performance data: execution time and memory stats.
* @property {Date} this.start - Start time.
* @property {Array<number>} this.hrstart - High-resolution real time Start.
* @property {Array<number>} this.end - End time.
* @property {Array<number>} this.hrend - High-resolution real time End.
* @this Perf
*/
function Perf() {
  /** @type {Date} */
  this.start;

  /** @type {Array<number>} */
  this.hrstart;

  /** @type {Date} */
  this.end;

  /** @type {Array<number>} */
  this.hrend;

  /**
   * @description Set starting stats
   * @returns {void}
   */
  this.begin = () => {
    this.start = new Date();
    this.hrstart = process.hrtime();
  };

  /**
   * @description Set finished stats
   * @returns {Perf}
   */
  this.finish = () => {
    // @ts-ignore
    this.end = new Date() - this.start;
    // @ts-ignore
    this.hrend = process.hrtime(this.hrstart);
    return this;
  };

  /**
   * @description Get memory usage with Human Readable stats
   * @returns {Array<{key:string, value:string}>}
   */
  this.getMemoryUsage = function () {
    /** @type {NodeJS.MemoryUsage} */
    const memoryUsage = process.memoryUsage();

    /** @type {Array<string>} */
    const keys = Object.keys(memoryUsage);

    return keys.map((/** @type {string} */ item) => {
      // @ts-ignore
      return { key: item, value: formatBytes(memoryUsage[item]) };
    });
  };

  /**
   * @description Get Performance stats
   * @returns {{
   *  memoryUsage: Array<{key:string, value:string}>,
   *  executionTime: {[key: string]: any}
   * }}
   */
  this.getStats = function () {
    return {
      memoryUsage: this.getMemoryUsage(),
      executionTime: {
        "Execution time: %dms": this.end,
        "Execution time (hr): %ds %dms": `${this.hrend[0]} ${
          this.hrend[1] / 1000000
        }`,
      },
    };
  };

  /**
   * @description Show Performance stats in the console
   * @returns {void}
   */
  this.showStats = function () {
    console.info("Execution time: %dms", this.end);
    console.info(
      "Execution time (hr): %ds %dms",
      this.hrend[0],
      this.hrend[1] / 1000000
    );
    console.info("Total Memory usage:", this.getMemoryUsage());
  };
}

module.exports = Perf;
