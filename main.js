const actors = new Map();
const {fork} = require('child_process');

class MasterSystem {
	static start(name) {
		const queu =[];
		const instances = [];
		const actor = fork('./worker.js');
		instances.push(actor);
		actors.set(name, {actor, instances, queu});
		console.log({command: 'start', param:name});
		actor.send({command: 'start', param:name});
		MasterSystem.subscribe(actor);
	}
	
	static send(params) {
		const {reciever, data} = params;
		const record = actors.get(reciever);
		const {actor} = record; 
		actor.send({command: 'message', param:data});
		
	}
	
	static exit (name) {
		const record = actors.get(name);
		const {actor} = record;
		actor.send({command: 'exit'});
	}
	
	static subscribe(actor) {
		actor.on('message', (message) => {
			const {command, param} = message;
			MasterSystem[command](param);
		});
	}
}



module.exports = MasterSystem;