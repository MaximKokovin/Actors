const logger = require('pino');
const Multiprocess = require('./multiprocess');
const Multi_threads = require('./multi_threads');
const Single_process = require('./single_process');

class Factory {
	static create(type){
		switch (type) {
			case 'multiprocess' :
				return new Multiprocess(logger);
				break;
			case 'multi_threads' :
				return new Multi_threads(logger);
				break;
			case 'single_process' :
				return new Single_process(logger);
				break;
		}
	}
};

module.exports = Factory;