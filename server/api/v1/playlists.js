const express = require('express');
const playlistsRouter = express.Router();
const { Song, Playlist, Artist, Album, PlaylistsSong, User_playlist } = require('../../models');
const { Op } = require("sequelize");

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

playlistsRouter.get("/top", async (req, res) => {
    try {
        const allPlaylists = await Playlist.findAll({ limit: 20 });
        res.json(allPlaylists);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

playlistsRouter.get("/byUser", async (req, res) => {
    try {
        const result = await User_playlist.findAll({
            where: {
                email: req.userEmail
            },
            include: {
                model: Playlist,
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
            }
        });
        res.json(result);
    } catch (e) {
        res.json({ message: e.message });
    };
});

playlistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newPlaylist = await Playlist.create(body);
        res.json(newPlaylist);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

// check if request is admin
playlistsRouter.use((req, res, next) => {
    req.isAdmin ? next() : res.status(403)
})

playlistsRouter.put("/:id", async (req, res) => {
    try {
        const { body } = req;
        const editPlaylist = await Playlist.update(body, {
            where: { id: req.params.id }
        })
        res.json(editPlaylist);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

playlistsRouter.delete("/:id", async (req, res) => {
    try {
        const result = await Playlist.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = playlistsRouter;
