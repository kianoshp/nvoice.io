<<<<<<< HEAD
var winston = require('winston');
=======
var winston     = require('winston');
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5

var logger = new(winston.Logger)({
    transports: [
<<<<<<< HEAD
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'logger.log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'exceptions.log'
        })
=======
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'logger.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
    ]
});

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    logger.setLevels('debug');
} else if (process.env.NODE_ENV === 'stage' || process.env.NODE_ENV === 'prod') {
    logger.setLevels('info');
}
module.exports = logger;