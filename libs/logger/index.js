const {loggerType} = require('../../config');

const loggers = {
	file: require('./pinoLogger'),
};

class Logger {
	constructor(logger) {
		if (Logger.instance){
			return Logger.instance;
		} else {
			this.logger = logger;
		}
	}
	
	info(msg) {
		const {logger} = this;
		logger.info(msg);
	}
	
	error(msg) {
		const {logger} = this;
		logger.error(msg);
	}
	
	final() {
		const { logger} = this;
		return logger.final();
	}
	set newLogger (logger) {
		this.logger = logger;
	}
	
}

Logger.instance = null;

module.exports = new Logger(loggers[loggerType]);