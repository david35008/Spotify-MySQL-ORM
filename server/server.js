require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const songs = require('./Routes/songs');
const albums = require('./Routes/albums');
const artists = require('./Routes/artists');
const playlists = require('./Routes/playlists');
const songsInPlaylists = require('./Routes/songsInPlaylists');
const users = require('./Routes/users');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan(function (tokens, req, res) {
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
}));

app.use('/users', users);

// app.use(ensureToken);

function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    let decoded = jwt.decode(bearerHeader);
    // console.log(decoded.exp -Math.floor(Date.now() / 1000) );
    jwt.verify(bearerHeader, process.env.SECRET_KEY, (error, data) => {
      if (error) {
        console.log('here');
        res.status(403).json({message:'incoreccet token'});
      } else {
        const newToken = {
          isAdmin: decoded.isAdmin,
          user: decoded.user
        }
        if (decoded.rememberToken === false) {
          newToken.rememberToken = decoded.rememberToken,
            newToken.exp = Math.floor(Date.now() / 1000) + (60*30)
        }
        const token = jwt.sign(newToken, process.env.SECRET_KEY)
        req.isAdmin = decoded.isAdmin
        res.cookie('token', token)
        next();
      }
    })
  } else {
    res.status(403).json({message: 'token is requierd'});
  }
}

app.use('/songs', songs);

app.use('/albums', albums);

app.use('/artists', artists);

app.use('/playlists', playlists);

app.use('/songsInPlaylists', songsInPlaylists)

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  };

  next(error);
};

app.use(errorHandler);


module.exports = app;
