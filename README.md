# logger

The simple zero dependency logger I always wanted.

![GitHub](https://img.shields.io/github/license/winstonthehun/logger?style=flat-square)
![Version](https://img.shields.io/github/package-json/v/winstonthehun/logger/main?style=flat-square)
![Size](https://img.shields.io/github/size/winstonthehun/logger/index.js?style=flat-square)

> No affiliation to the winston logger library. It unfortunately shares a name with me 🤦‍♂️

---

## Getting Started

`npm install @winstonthehun/logger`

### Usage

```js
import logger from "@winstonthehun/logger";

logger.info("wow", {
  data: {
    whatever: "you want",
    even: {
      authorization: "secrets",
      because: "it redacts the values",
    },
  },
});
```

- use on frontend and backend
- set `process.env.LOG_LEVEL` for your backends

### Guide to log levels

Not specific to this package, but a general pattern in logging explained.

- `error` - something is actually wrong
- `warn` - might be a problem
- `info` - normal user behaviour
- `log` - not a _real_ log level, but you can use it as a less important info
- `debug` - things like request logs, very detailed info, step by step state of key functions

Usually in production we don't log anything below info. On dev you probably want to see debug to have maximum visibility.

The reason we use environment variables to set the minimum log level, so when shit hits the fan, you can set it to `debug` in production for a few minutes and then turn it back to `info` once you've collected all the data you need to investigate.

### Pretty vs Production logs

Once your code runs in docker or lambda (or wherever else), there is a log shipper, which - you guessed it - ships your logs off from the console to datadog or kibana or whatever platform you use to collect logs.

In order to recognize where a log entry ends, we can't give it a 20 line blob. They need one line, as a string.

What this logger does is stringify all the data and voila, your log entry will be recognizable as 1 line.

Anything running in the browser or within dev builds should always give you pretty logs. If not, check your `process.env.NODE_ENV`.
