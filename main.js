const actors = new Map();

class AcrorsSystem {
	static register(Actor) {
		if (Actor) {
			const name = Actor.name;
			const queue = [];
			const instances = [];
			const ready = [];
			actors.set(name, {Actor, instances, queue});
		};
	}
	
	static start(name) {
		const nameToLowerCase = name.toLowerCase()
		require(`./actors/${nameToLowerCase}.js`)
		console.dir(actors)
		const {Actor, instances} = actors.get(name);
		if (Actor) {
			const actor = new Actor();
			instances.push(actor);
		}
	}
	
	static async send(receiver, data) {
		const record = actors.get(receiver);
		const {instances, queue} = record;
		const actor = instances.shift();
		
		if (!actor) {
			queue.push(data);
			return;
		}
		
		await actor.message(data);
		while (queue.length > 0) {
			const data = queue.shift();
			await actor.message(data);
		}
		instances.push(actor);
		/*
		if (queue.length) {
			await Promise.all(queue.map( data => actor.message(data) ))
		}
		*/
	}
	
	static async exit (name) {
		const record = actors.get(name);
		const {instances} = record;
		await Promise.all(instances.map(instance => instance.stop() ))
	}
}

module.exports = AcrorsSystem;