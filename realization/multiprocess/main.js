const actors = new Map();
const {fork} = require('child_process');
const log = require('../../libs/logger');
class MasterSystem {
	static  start(name) {
		const queu =[];
		const instances = [];
		if (!process.channel){
			log.info(`MasterSystem name ${name}`)
			const actor =  fork('./realization/multiprocess/index.js');
			instances.push(actor);
			actors.set(name, {actor, instances, queu});
			log.info({command: 'start', param:name});
			MasterSystem.subscribe(actor);
			actor.send({command: 'start', param:name});
		}
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