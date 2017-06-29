// /*
// Desc:
// */
var fs = require('fs');
var moment = require('moment');
var winston = require('winston');
var MongoDB = require('winston-mongodb');
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

winston.emitErrs = true;
logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'file-info-logs',
      timestamp: function() {
        return moment().format();
      },
      level:config.logging.file_logging.info_log_level,
      filename: './log/info-logs.log',
      handleExceptions: false,
      json: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' | '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    new winston.transports.File({
      name: 'file-error-logs',
      timestamp: function() {
        return moment().format();
      },
      level: config.logging.file_logging.error_log_level,
      filename: './log/error-logs.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +'|'+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    new winston.transports.File({
      name:"file-all-logs",
      timestamp: function() {
        return moment().format();
      },
      level:config.logging.file_logging.all_log_level,
      filename: './log/all-logs.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' | '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    new winston.transports.Console({
      name:"console-logs",
      'timestamp':function() {
        return moment().format();
      },
      level: config.logging.console_logging.console_log_level,
      handleExceptions: true,
      json: false,
      colorize: true,
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +'|'+ options.level.toUpperCase() +'|'+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    // DB logging configuration
    new winston.transports.MongoDB({
      name: 'db-info-logs',
      timestamp: function() {
        return moment().format();
      },
      handleExceptions: false,
      level: config.log_level,
      db :config.logging.db_logging.db_url,
      collection: 'info-logs',
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' | '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    new winston.transports.MongoDB({
      name: 'db-error-logs',
      timestamp: function() {
        return moment().format();
      },
      level: config.logging.db_logging.error_log_level,
      db :config.logging.db_logging.db_url,
      collection: 'error-logs',
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +'|'+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    }),
    new winston.transports.MongoDB({
      name:"db-all-logs",
      timestamp: function() {
        return moment().format();
      },
      level:config.logging.db_logging.all_log_level,
      db :config.logging.db_logging.db_url,
      collection: 'all-logs',
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' | '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ],
  exitOnError: false
});

if(!config.logging.file_logging.file_logging_enabled){
  logger.remove('file-info-logs');
  logger.remove('file-error-logs');
  logger.remove('file-all-logs');
}else{
    if(!config.logging.file_logging.all_log_enabled){
      logger.remove('file-all-logs');
    }
    if(!config.logging.file_logging.info_log_enabled){
      logger.remove('file-info-logs');
    }
    if(!config.logging.file_logging.info_log_enabled){
      logger.remove('file-error-logs');
    }
}

//For DB logging

if(!config.logging.db_logging.db_logging_enabled){
  logger.remove('db-info-logs');
  logger.remove('db-error-logs');
  logger.remove('db-all-logs');
}else{
    if(!config.logging.db_logging.all_log_enabled){
      logger.remove('db-all-logs');
    }
    if(!config.logging.db_logging.info_log_enabled){
      logger.remove('db-info-logs');
    }
    if(!config.logging.db_logging.info_log_enabled){
      logger.remove('db-error-logs');
    }
}

if(!config.logging.console_logging.console_logging_enabled){
  logger.remove('console-logs');
}

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
