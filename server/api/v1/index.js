const express = require('express');
const index = express.Router();
const checkAdmin = require('../../helpers/checkAdmin');

index.use('/songs', require('./songs'));

index.use('/albums', require('./albums'));

index.use('/artists', require('./artists'));

index.use('/playlists', require('./playlists'));

index.use('/songsInPlaylists', require('./songsInPlaylists'))

index.use('/interactions', require('./interactions'))

//============================== Admin Routes ======================================//

index.use('/users', checkAdmin, require('./users'))


module.exports = index;
