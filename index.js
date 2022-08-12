const currentLogLevel = process.env.LOG_LEVEL || "info";
const LogLevels = { error: 4, warn: 3, info: 2, log: 1, debug: 0 };

const sensitiveKeys = [
  "secret",
  "jwt",
  "token",
  "refresh_token",
  "password",
  "authorization",
];

const redact = (k, v) =>
  sensitiveKeys.includes(k.toLowerCase()) ? "REDACTED" : v;

const log = (level) => (message, data) => {
  const isProduction = process.env.NODE_ENV === "production";
  const isBrowser = typeof window !== "undefined";

  // swallow logs with log levels below current config
  if (LogLevels[level] < LogLevels[currentLogLevel]) {
    return () => null;
  }

  const printPretty = !isProduction || isBrowser;

  if (printPretty) {
    return console[level](message, data);
  }

  return console[level](
    JSON.stringify({ ts: Date.now(), message, data }, redact, null)
  );
};

const logger = {
  error: log("error"),
  warn: log("warn"),
  info: log("info"),
  log: log("log"),
  debug: log("debug"),
};

module.exports.default = logger;
