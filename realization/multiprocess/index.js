
module.exports = !process.channel ? require('./main') : require('./worker');