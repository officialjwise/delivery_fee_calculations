const HttpStatus = require('../utils/httpStatus');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong';

    res.status(status).json({
        success: false,
        message,
        error: {
            status,
            message,
        }
    });
next();
}

module.exports = errorHandler;