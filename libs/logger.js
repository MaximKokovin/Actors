const pino = require('pino');

const DESTINATION = './loggs';
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

class Logger {
	constructor(pino, logger) {
		if (Logger.instance){
			return Logger.instance;
		} else {
			this.logger = logger;
			this.pino = pino;
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
		const {pino, logger} = this;
		return pino.final(logger, (err, finalLogger, evt) => {
		  finalLogger.info(`${evt} caught`)
		  if (err) finalLogger.error(err, 'error caused exit')
		  process.exit(err ? 1 : 0)
		})
	}
	
}

Logger.instance = null;

module.exports = new Logger(pino, logger);