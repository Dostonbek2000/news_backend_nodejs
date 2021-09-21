const appRoot = require('app-root-path');
const winston = require('winston');

let options = {
    fileInfo: {
        level: 'info',
        filename: `${appRoot}/logs/info.log`,
        handleException: true,
        json: true,
        maxsize:5242880,
        maxFiles: 5,
        colorize: false
    },
    fileError: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleException: true,
        json: true,
        maxsize:5242880,
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'debug',
        handleException: true,
        json: false,
        colorize: true
    },
};

let logger = winston.createLogger({
    transports: [
        new (winston.transports.File)(options.fileInfo),
        new (winston.transports.File)(options.fileError),
        new (winston.transports.Console)(options.console)
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;