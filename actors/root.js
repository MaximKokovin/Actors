const {realizationType} = require('../config');
const ActorsSystem = require(`../realization/${realizationType}`);

ActorsSystem.register(class Root {
	constructor() {
		ActorsSystem.start('Mailer');
		//ActorsSystem.start('Renderer');
		ActorsSystem.start('Observer');
	}
	
	async stop() {
		console.log('stop in root')
		await ActorsSystem.exit('Mailer');
		//await ActorsSystem.exit('Renderer');
		await ActorsSystem.exit('Observer');
	}
})