const pino = require('pino');

const DESTINATION = './loggs.js';
const TIMEFUNCTION  = pino.stdTimeFunctions.isoTime;

const formatters = {
	bindings (bindings) {
		return { }
	},
}

const options = {
	timestamp: TIMEFUNCTION,
	formatters,
}

const logger = pino(options, pino.destination({
  dest: DESTINATION,
  //minLength: 4096, // Buffer before writing
  sync: false // Asynchronous logging
}))

class LoggerPino {
	constructor(logger) {
		this.logger = logger;
	}
	
	info(msg) {
		console.log(msg)
		const {logger} = this;
		logger.info(msg);
	}
	
	error(msg) {
		const {logger} = this;
		logger.error(msg);
	}
	
	final() {
		const {logger} = this;
		return pino.final(logger, (err, finalLogger, evt) => {
		  finalLogger.info(`${evt} caught`);
		  if (err) finalLogger.error(err, 'error caused exit');
		  process.exit(err ? 1 : 0);
		})
	}
}

module.exports = new LoggerPino(logger);