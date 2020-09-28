const express = require('express');
const index = express.Router();

index.use('/songs', require('./songs'));

index.use('/albums', require('./albums'));

index.use('/artists', require('./artists'));

index.use('/playlists', require('./playlists'));

index.use('/songsInPlaylists', require('./songsInPlaylists'))

index.use('/interactions', require('./interactions'))

module.exports = index;
