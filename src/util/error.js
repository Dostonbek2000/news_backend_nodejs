const winston = require('./winston.logger');
const expressValidation = require('express-validation');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    if (err instanceof expressValidation.ValidationError) {
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        err.message = unifiedErrorMessage;
        err.statusCode = 400;
    }

    const { statusCode, message } = err;

    winston.error(`${statusCode || 500} - ${message} - ${err.stack}`);

    res.status(statusCode).json({
        status: "Error",
        statusCode,
        message
    });
};

module.exports = {
    ErrorHandler,
    handleError
}