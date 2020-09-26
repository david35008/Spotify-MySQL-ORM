const express = require('express');
const SongsInPlaylistsRouter = express.Router();
const { User_playlist } = require('../models');

SongsInPlaylistsRouter.post("/", async (req, res) => {
    try {
        const { playlistId, userEmail } = req;
        const match = {playlistId, user: userEmail}
        const newSongInPlaylist = await User_playlist.create(match);
        res.json(newSongInPlaylist);
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
});

SongsInPlaylistsRouter.delete("/", async (req, res) => {
    const { songId, playlistId } = req.query;
    try {
        const result = await User_playlist.destroy({
            where: { songId, playlistId }
        })
        res.json(result);
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = SongsInPlaylistsRouter;
