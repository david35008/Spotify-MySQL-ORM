const express = require('express');
const playlistsRouter = express.Router();
const checkAdmin = require('../../helpers/checkAdmin');
const { Song, Playlist, Artist, Album, PlaylistsSong } = require('../../models');
const { Op } = require("sequelize");

// get all playlists
playlistsRouter.get("/", async (req, res) => {
    try {
        const allPlaylists = await Playlist.findAll({
            include: [
                {
                    model: PlaylistsSong,
                    attributes: ["id"],
                    include: [{
                        model: Song,
                        include: [
                            {
                                model: Artist,
                                attributes: ["name"],
                            },
                            {
                                model: Album,
                                attributes: ["name"],
                            },
                        ],
                    }],
                }
            ]
        });
        res.json(allPlaylists);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get playlist filtered by id from params
playlistsRouter.get("/byId/:id", async (req, res) => {
    try {
        const result = await Playlist.findByPk(req.params.id, {
            include: [
                {
                    model: PlaylistsSong,
                    attributes: ["id"],
                    include: [{
                        model: Song,
                        include: [
                            {
                                model: Artist,
                                attributes: ["name"],
                            },
                            {
                                model: Album,
                                attributes: ["name"],
                            },
                        ],
                    }],
                }
            ]
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get playlist filtered by name from params
playlistsRouter.get("/byName/:name", async (req, res) => {
    try {
        const results = await Playlist.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get top 20 playlists
playlistsRouter.get("/top", async (req, res) => {
    try {
        const allPlaylists = await Playlist.findAll({ limit: 20 });
        res.json(allPlaylists);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// create new playlist
playlistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        body.userId = req.decoded.userId;
        const newPlaylist = await Playlist.create(body);
        res.json(newPlaylist);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

//============================== Admin Routes ======================================//

// update playlist information
playlistsRouter.put("/:id", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const editPlaylist = await Playlist.update(body, {
            where: { id: req.params.id }
        })
        res.json(editPlaylist);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// delete playlist
playlistsRouter.delete("/:id", checkAdmin, async (req, res) => {
    try {
        const result = await Playlist.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = playlistsRouter;
