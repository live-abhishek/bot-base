var logFileName = process.env.LOG_FILENAME;

var log4js = require('log4js');
log4js.configure({
  appenders: { 
      fileappender: { type: 'dateFile', filename: logFileName, pattern: "-yyyy-MM-dd", alwaysIncludePattern: true},
      consoleappender: {type: 'console'}
    },
  categories: { default: { appenders: ['fileappender', 'consoleappender'], level: 'debug' } }
});

module.exports = {
  log4js: log4js
}