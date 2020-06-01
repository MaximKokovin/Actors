const {fork} = require('child_process');
const {realizationType} = require('./config');
const log = require('./libs/logger');
const SHUTDOWN_TIMEOUT = 6000;
const GRACEFULL_TIMEOUT = 5000;

fork('./server.js');

const communication = require(`./realization/${realizationType}`);
communication.start('Root');

process.on('SIGINT', async () => {
	communication.exit('Root');
	setTimeout(() => {
		log.info('GRACEFULL SHOTDOWN');
		process.exit(0);
	}, GRACEFULL_TIMEOUT)
	setTimeout(() => {
		process.exit(1);
	}, SHUTDOWN_TIMEOUT);
})