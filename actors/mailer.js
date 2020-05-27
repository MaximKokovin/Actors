const {realizationType, auth} = require('../config');
const ActorsSystem = require(`../realization/${realizationType}`);
const nodemailer = require('nodemailer');
const log = require('../libs/logger')

ActorsSystem.register(class Mailer {
	
	message(data) {
		this.sendEmail(data);
	}
	
	async sendEmail(data) {
		log.info(auth)
		let transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru',
			port: 587,
			secure: false,
			auth
		});
		try {
			const info = await transporter.sendMail({
				from: '"Tested server" <kokovin.maxim@yandex.ru>', // sender address
				to: "kokovin.m@gmail.com", // list of receivers
				subject: "Server notification", // Subject line
				text: data, // plain text body
			})
			log.info(`Message white id "${info.messageId}" has sent`);
		} catch (err) {
			log.error(err);
		}
		
	}
	
	async stop() {
		log.info('Mailer has stoped;')
	}
})