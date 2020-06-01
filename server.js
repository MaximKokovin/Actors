const http = require('http');
const log = require('./libs/logger');
const httpError = (res, status, msg='') => {
	res.status = status;
	res.end(msg);
} 

const receiveArguments = req => {
	return new Promise(resolve => {
		const buffer = [];
		req.on('data', (chank) => {
			buffer.push(chank);
		})
		req.on('end', () => {
			const data = buffer.join('');
			const parsedData = JSON.parse(data);
			resolve(parsedData);
		})
	})
}

http.createServer(async (req, res)=> {
	const url = new URL (req.url, 'http://localhost:8000');
	const {pathname } = url;
	req.setEncoding('utf8');
	
	if(pathname === '/test' || '/') {
		try {
			//const args = await receiveArguments(req)
			res.status = 200;
			res.end(JSON.stringify({data:'Server is active.'}));
		} catch (err) {
			log.error(err);
			httpError(res, 502, 'Server error');
		}
		
	} else {
		httpError(res, 404, 'Page not found');
	}
	
	
}).listen(8000, () => {
	log.info('Server is listening on port 8000')
});

