const express = require('express');
const Interactions = express.Router();

Interactions.use('/songs', require('./interactionRoues/songsInteractions'));

Interactions.use('/albums', require('./interactionRoues/albumsInteractions'));

Interactions.use('/artists', require('./interactionRoues/artistsInteractions'));

Interactions.use('/playlists', require('./interactionRoues/playlistsInteractions'));

module.exports = Interactions;
