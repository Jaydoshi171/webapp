const { createLogger, transports, format } = require("winston");

const appLogger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: "app.log",
    }),
  ],
});

module.exports = appLogger;