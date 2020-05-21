const SHUTDOWN_TIMEOUT = 4000;

class ActorsSystem {
	static register(actor) {
		this.actorClass = actor;
	}
	
	static start(name) {
		process.send({command: 'start', param:name})
	}
	
	static send(reciever, data) {
		process.send({command: 'send', param: {reciever, data}})
	}
	
	static async exit(name) {
		process.send({command: 'exit', param: name});
	}
}
ActorsSystem.actorInstance = null;

process.on('message', async (message) => {
	const {command, param} = message;
	if (command === 'start') {
		require(`./actors/${param.toLowerCase()}.js`);
		const actorClass = ActorsSystem.actorClass;
		ActorsSystem.actorInstance = new actorClass();
		console.log(`Actor ${param} has started`);
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