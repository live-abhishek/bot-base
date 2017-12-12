var bunyan = require('bunyan');

var logger = bunyan.createLogger({
    name: 'logger',
    level: 'debug',
    streams: [
        {
            level: 'trace',
            stream : process.stdout
        },
        {
            type: 'rotating-file',
            path: process.env.LOG_FILENAME,
            period: '1d',
            count: 10
        }
    ],
    src: true
});

module.exports = {
    logger: logger
}