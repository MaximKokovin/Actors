const SHUTDOWN_TIMEOUT = 4000;
const {parentPort, workerData} = require('worker_threads');

class ActorsSystem {
	static register(actor) {
		this.actorClass = actor;
	}
	
	static start(name) {
		parentPort.postMessage({command: 'start', param:name})
	}
	
	static send(reciever, data) {
		parentPort.postMessage({command: 'send', param: {reciever, data}})
	}
	
	static async exit(name) {
		parentPort.postMessage({command: 'exit', param: name});
	}
}
ActorsSystem.actorInstance = null;

parentPort.on('message', async (message) => {
	const {command, param} = message;
	if (command === 'start') {
		console.log(`workerData ${workerData}`);
		require(`../../actors/${workerData.toLowerCase()}.js`);
		const actorClass = ActorsSystem.actorClass;
		ActorsSystem.actorInstance = new actorClass();
		console.log(`Actor ${workerData} has started`);
	};
	
	if (command === 'message') {
		ActorsSystem.actorInstance.message(param)
	};
	
	if (command === 'exit') {
		await ActorsSystem.actorInstance.stop();
		process.exit(0);
		return;
	};
})


process.on('SIGINT', () => {});

module.exports= ActorsSystem;