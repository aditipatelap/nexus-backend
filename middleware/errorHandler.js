const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    const msg = `${err.name}: ${err.message}`;
    logEvents(msg, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler;