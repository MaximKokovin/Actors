const ActorsSystem = require('./main.js');
const {fork} = require('child_process');

const GRACEFUL_TIMEOUT = 4000;
const SHUTDOWN_TIMEOUT = 5000;

const process = fork('./server.js');


ActorsSystem.start('Root');



process.on('SIGINT', async () => {
	/* // Тимур написал 
	  console.log('');
	  ActorSystem.stop('Root');
	  setTimeout(() => {
		console.log('Graceful shutdown');
		process.exit(0);
	  }, EXIT_NORMAL);
	  setTimeout(() => {
		console.log('Abnormal termination');
		process.exit(1);
	  }, EXIT_ABNORMAL);*/
	setTimeout(() => {
		process.exit(1);
	}, SHUTDOWN_TIMEOUT);
	
	await ActorsSystem.exit('Root');
	console.log('GRACEFULL SHOTDOWN');
	process.exit(0);
})