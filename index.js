const ActorsSystem = require('./main.js');
const {fork} = require('child_process');

const SHUTDOWN_TIMEOUT = 4000;

const child = fork('./server.js');

ActorsSystem.start('Root');

process.on('SIGINT', async () => {
	setTimeout(() => {
		process.exit(1);
	}, SHUTDOWN_TIMEOUT);
	
	await ActorsSystem.exit('Root');
	console.log('GRACEFULL SHOTDOWN');
	process.exit(0);
})