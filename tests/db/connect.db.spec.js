//@ts-check
const { Sequelize, DataTypes } = require("sequelize");
const { connect, dbDir } = require("../../src/db/connect.db.js");
const sequelize = require("sequelize");

jest.mock("sequelize", () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(() => {
      return {
        hasMany: jest.fn(),
        sync: jest.fn(),
        belongsTo: jest.fn(),
      };
    }),
    sync: jest.fn(),
  };
  const actualSequelize = jest.requireActual("sequelize");
  return {
    Sequelize: jest.fn(() => mSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

const mSequelizeContext = new Sequelize();

describe("Sequelize implementation connect()", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it("should setup db correctly", async () => {
    const mTable1 = {
      hasMany: jest.fn(),
      sync: jest.fn(),
      belongsTo: jest.fn(),
    };
    const mTable2 = { sync: jest.fn(), belongsTo: jest.fn() };
    jest.mocked(mSequelizeContext.define).mockImplementation(
      /**
       * The CallAgain method calls the provided function twice
       * @param {string} modelName function to call twice
       * @return {any} The result of the function call
       */
      (modelName) => {
        switch (modelName) {
          case "live":
            return mTable1;
          case "log_entry":
            return mTable2;
        }
      }
    );
    await connect();
    expect(Sequelize).toHaveBeenCalledWith({
      dialect: "sqlite",
      isolationLevel: "SERIALIZABLE", // Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      logging: false,
      storage: dbDir + "/db.sqlite",
    });
    expect(mSequelizeContext.authenticate).toHaveBeenCalled();
    expect(mSequelizeContext.sync).toHaveBeenCalled();
    // @todo: Uncomment when the define method is implemented (all models should be defined)
    /* expect(mSequelizeContext.define).toHaveBeenCalledWith(
      "live",
      {
        fieldName_1: {
          type: DataTypes.STRING,
        },
      },
      { tableName: "live" }
    );
    expect(mSequelizeContext.define).toHaveBeenCalledWith(
      "log_entry",
      {
        fieldName_1: {
          type: DataTypes.STRING,
        },
      },
      { tableName: "log_entry" }
    );
    expect(mTable1.hasMany).toHaveBeenCalledWith(mTable2);
    expect(mTable1.sync).toHaveBeenCalledWith(1);
    expect(mTable2.sync).toHaveBeenCalledWith(1); */
  });

  it("should handle sync errors", async () => {
    const mTable1 = {
      hasMany: jest.fn(),
      sync: jest.fn(),
      belongsTo: jest.fn(),
    };
    const mTable2 = { sync: jest.fn(), belongsTo: jest.fn() };
    jest
      .mocked(mSequelizeContext.sync)
      .mockRejectedValue(new Error("Sync failed"));
    global.console.error = jest.fn();
    const consoleErrorSpy = jest.spyOn(console, "error");
    expect(Sequelize).toHaveBeenCalledWith({
      dialect: "sqlite",
      isolationLevel: "SERIALIZABLE", // Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      logging: false,
      storage: dbDir + "/db.sqlite",
    });
    try {
      await connect();
    } catch (error) {
      expect(error).toEqual(new Error("Sync failed"));
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Unable to connect to the database:",
        error
      );
    }
  });
});
