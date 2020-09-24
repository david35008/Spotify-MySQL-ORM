const express = require('express');
const SongsInPlaylistsRouter = express.Router();
const { Playlists_Song } = require('../models');

SongsInPlaylistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newSongInPlaylist = await Playlists_Song.create(body);
        res.json(newSongInPlaylist);
    } catch (e) {
        res.json({ message: e.message });
    };
});

SongsInPlaylistsRouter.delete("/", async (req, res) => {
    const { song_id, playlist_id } = req.query;
    try {
        const result = await Playlists_Song.destroy({
            where: { song_id, playlist_id }
        })
        res.json(result);
    } catch (e) {
        res.json({ message: e.message });
    };
});

module.exports = SongsInPlaylistsRouter;
