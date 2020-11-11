const express = require('express');
const SongsInPlaylistsRouter = express.Router();
const { PlaylistsSong } = require('../../models');

// add song to a playlist
SongsInPlaylistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newSongInPlaylist = await PlaylistsSong.create(body);
        res.json(newSongInPlaylist);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// remove song from a playlist
SongsInPlaylistsRouter.delete("/", async (req, res) => {
    const { songId, playlistId } = req.query;
    try {
        const result = await PlaylistsSong.destroy({
            where: { songId, playlistId }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = SongsInPlaylistsRouter;
