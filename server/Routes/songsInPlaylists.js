const express = require('express');
const SongsInPlaylistsRouter = express.Router();
const { PlaylistsSong } = require('../models');

SongsInPlaylistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newSongInPlaylist = await PlaylistsSong.create(body);
        res.json(newSongInPlaylist);
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
});

SongsInPlaylistsRouter.delete("/", async (req, res) => {
    const { songId, playlistId } = req.query;
    try {
        const result = await PlaylistsSong.destroy({
            where: { songId, playlistId }
        })
        res.json(result);
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = SongsInPlaylistsRouter;
