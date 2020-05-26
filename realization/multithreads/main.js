const actors = new Map();
const {Worker} = require('worker_threads');

class MasterSystem {
	static start(name) {
		const queu =[];
		const instances = [];
		const worker = new Worker('./realization/multithreads/worker.js',{workerData: name});
		instances.push(worker);
		actors.set(name, {worker, instances, queu});
		console.log({command: 'start', param:name});
		worker.postMessage({command: 'start'});
		MasterSystem.subscribe(worker);
	}
	
	static send(params) {
		const {reciever, data} = params;
		const record = actors.get(reciever);
		const {worker} = record; 
		worker.postMessage({command: 'message', param:data});
		
	}
	
	static exit (name) {
		const record = actors.get(name);
		const {worker} = record;
		worker.postMessage({command: 'exit'});
	}
	
	static subscribe(worker) {
		worker.on('message', (message) => {
			const {command, param} = message;
			MasterSystem[command](param);
		});
	}
}



module.exports = MasterSystem;