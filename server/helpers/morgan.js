const morgan = require('morgan');

module.exports = morgan(function (tokens, req, res) {
    const myTiny = [tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms']
    if (req.method === 'POST' || req.method === 'PUT') {
      return myTiny.concat([JSON.stringify(req.body)]).join(' ')
    } else {
      return myTiny.join(' ')
    }
  })