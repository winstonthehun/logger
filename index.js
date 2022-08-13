const redact = (k, v) =>
  [
    "secret",
    "jwt",
    "token",
    "refresh_token",
    "password",
    "authorization",
  ].includes(k.toLowerCase())
    ? "REDACTED"
    : v;

const envLogLevel = process.env.LOG_LEVEL || "info";
const LogLevels = { error: 4, warn: 3, info: 2, log: 1, debug: 0 };

const log = (level) => {
  // swallow logs with log levels below current config
  if (LogLevels[level] < LogLevels[envLogLevel]) {
    return () => null;
  }

  return (message, data) => {
    const isProduction = process.env.NODE_ENV === "production";
    const isBrowser = typeof window !== "undefined";
    const printPretty = !isProduction || isBrowser;

    printPretty
      ? console[level](message, data)
      : console[level](
          JSON.stringify({ ts: Date.now(), message, data }, redact, null)
        );
  };
};

const logger = {
  error: log("error"),
  warn: log("warn"),
  info: log("info"),
  log: log("log"),
  debug: log("debug"),
};

module.exports.default = logger;
