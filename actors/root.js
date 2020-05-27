const {realizationType} = require('../config');
const ActorsSystem = require(`../realization/${realizationType}`);
const log = require('../libs/logger');

ActorsSystem.register(class Root {
	constructor() {
		ActorsSystem.start('Mailer');
		//ActorsSystem.start('Renderer');
		ActorsSystem.start('Observer');
	}
	
	async stop() {
		log.info('Stop in root')
		await ActorsSystem.exit('Mailer');
		//await ActorsSystem.exit('Renderer');
		await ActorsSystem.exit('Observer');
	}
})