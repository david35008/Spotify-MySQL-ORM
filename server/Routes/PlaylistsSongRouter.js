const express = require('express');
const PlaylistsSongRouter = express.Router();
const { Playlists_Song } = require('../models');

PlaylistsSongRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newSongInPlaylist = await Playlists_Song.create(body);
        res.json(newSongInPlaylist);
    } catch (e) {
        res.json({ message: e.message });
    };
});

PlaylistsSongRouter.delete("/", async (req, res) => {
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

module.exports = PlaylistsSongRouter;
