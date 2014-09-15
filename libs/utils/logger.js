var winston = require('winston');
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'logger.log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'exceptions.log'
        })
    ]
});

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    logger.setLevels('debug');
} else if (process.env.NODE_ENV === 'stage' || process.env.NODE_ENV === 'prod') {
    logger.setLevels('info');
}
module.exports = logger;