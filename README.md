# logger
The simple zero dependency logger I always wanted

## Intent

This is meant to be a nice and simple logger, that will do just fine in most cases.

## Features
- log level based on `process.env.LOG_LEVEL`
- stringify log entry for log shippers, so they appear as 1 line
- redact sensitive data e.g. auth headers
- works on server and client side

