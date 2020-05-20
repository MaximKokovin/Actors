const ActorsSystem = require('../main.js');
const nodemailer = require('nodemailer');
const auth = require('../config');


ActorsSystem.register(class Mailer {
	
	message(data) {
		this.sendEmail(data);
	}
	
	async sendEmail(data) {
		console.log(auth)
		let transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth
		});
		try {
			const info = await transporter.sendMail({
				from: '"Tested server" <kokovin.maxim@yandex.ru>', // sender address
				to: "kokovin.m@gmail.com", // list of receivers
				subject: "Server notification", // Subject line
				text: data, // plain text body
			})
			console.log(info.messageId);
		} catch (err) {
			console.log(err);
		}
		
	}
	
	async stop() {
		console.log('Mailer has stoped;')
	}
})