const ActorsSystem = require('../main.js');

ActorsSystem.register(class Root {
	constructor() {
		ActorsSystem.start('Mailer');
		//ActorsSystem.start('Renderer');
		ActorsSystem.start('Observer');
	}
	
	async stop() {
		await ActorsSystem.exit('Mailer');
		//await ActorsSystem.exit('Renderer');
		await ActorsSustem.exit('Observer');
	}
})