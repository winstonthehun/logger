const logger = require("./index").default;

const message = "test-message";
const data = ["random", "stuff"];
const stringifiedData = '{"data":["random","stuff"]}';

describe("Log levels", () => {
  beforeAll(() => {
    jest.spyOn(global.console, "info");
    jest.spyOn(global.console, "debug");
    process.env.LOG_LEVEL = "info";
  });

  afterAll(() => {
    process.env.LOG_LEVEL = undefined;
  });

  test("should swallow lower log levels", () => {
    logger.debug(message, { data });

    expect(console.debug).not.toHaveBeenCalled();
  });

  test("should log current or higher log levels", () => {
    logger.info(message, { data });

    expect(console.info).toHaveBeenCalledWith(message, { data });
  });
});

describe("Production logs", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "production";
  });

  afterAll(() => {
    process.env.NODE_ENV = "development";
  });

  test("data is stringified in production", () => {
    logger.info(message, { data });

    expect(console.info).toHaveBeenCalledWith(message, stringifiedData);
  });
});

describe("Redacts secret", () => {
  beforeAll(() => {
    jest.spyOn(global.console, "info");
    process.env.NODE_ENV = "production";
  });

  afterAll(() => {
    process.env.NODE_ENV = "development";
  });

  test("data is stringified in production", () => {
    const payload = {
      authorization: "123456",
      nested: {
        password: "password123",
      },
    };
    logger.info(message, payload);
    const stringifiedSecretData =
      '{"authorization":"REDACTED","nested":{"password":"REDACTED"}}';

    expect(console.info).toHaveBeenCalledWith(message, stringifiedSecretData);

    // verify that source object is not mutated
    expect(payload).toEqual({
      authorization: "123456",
      nested: {
        password: "password123",
      },
    });
  });
});
