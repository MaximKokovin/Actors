const MasterSystem = require('./main.js');
const {fork} = require('child_process');
const SHUTDOWN_TIMEOUT = 6000;
const GRACEFULL_TIMEOUT = 5000;

const child = fork('./server.js');

MasterSystem.start('Root');

process.on('SIGINT', async () => {
	MasterSystem.exit('Root');
	setTimeout(() => {
		console.log('GRACEFULL SHOTDOWN');
		process.exit(0);
	}, GRACEFULL_TIMEOUT)
	setTimeout(() => {
		process.exit(1);
	}, SHUTDOWN_TIMEOUT);
	
	
	
})