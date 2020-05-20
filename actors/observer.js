const ActorsSystem = require('../main.js');
const http = require('http');
const URL = 'http:localhost:8000/test'

const getResponseData = res => new Promise(resolve => {
	const buffer = []
	res.on('data', (chank) => {		
		buffer.push(chank);
	})
	res.on('end', () => {
		const data = buffer.join('');
		const parsedData  = JSON.parse(data)
		resolve(parsedData);
	})
})

ActorsSystem.register(class Observer {
	constructor() {
		this.prevState = undefined;
		this.observer = setInterval(() => {
			this.check()
		}, 5000)
	}
	
	check() {
		http.get(URL, async (res)=> {
			res.setEncoding('utf8');
			const {statusCode} = res;
			const data = await getResponseData(res);
			if (statusCode === 200) {
				this.setState('active', `Server is active. Status ${statusCode}`);
			} else {
				this.setState('disable', `Server is not available. Error code ${error.code}`);
			}
		}).on('error', (error) => {
			this.setState('disable', `Server is not available. Error code ${error.code}`);
		})
	}
	
	setState(state, data) {		
		if (state !== this.prevState) {
			ActorsSystem.send('Mailer', data);
			this.prevState = state;
		}
	}
	
	message() {};
	
	async stop() {
		clearInterval(this.observer); 
		console.log('Observer has stoped;')
	}
})
