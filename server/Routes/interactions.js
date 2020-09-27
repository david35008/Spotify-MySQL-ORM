const express = require('express');
const Interactions = express.Router();
const { Interaction, User_album, User_artist, User_playlist, Song, Playlist, Artist, Album, PlaylistsSong } = require('../models');
const { Op } = require("sequelize");

Interactions.get("/songs", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll()
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/songs/byUser", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll({
            where: {
                userId: req.userId
            }
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/songs", async (req, res) => {
    try {
        const { body, userId } = req;
        body.userId = userId;
        const newInteraction = await Interaction.create(body);
        res.json(newInteraction);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/albums/byUser", async (req, res) => {
    try {
        const allInteractions = await User_album.findAll({
            where: {
                email: req.userEmail
            },
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/albums", async (req, res) => {
    try {
        const { body, userEmail } = req;
        body.email = userEmail;
        const existInteraction = await User_album.findOne({
            where: {
                email: userEmail,
                albumId: body.albumId
            }
        })
        if (existInteraction) {
            const editInteraction = await User_album.update(body, {
                where: {
                    email: userEmail,
                    albumId: body.albumId
                }
            });
            res.json(editInteraction);
        } else {
            const newInteraction = await User_album.create(body);
            res.json(newInteraction);
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/UserAlbums", async (req, res) => {
    console.log(req.body);
    try {
        const allInteractions = await User_album.findAll({
            where: {
                email: req.userEmail,
                albumId: { [Op.in]: req.body }
            },
            include: [{
                model: Album,
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
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/artists", async (req, res) => {
    try {
        const { body, userEmail } = req;
        body.email = userEmail;
        const existInteraction = await User_artist.findOne({
            where: {
                email: userEmail,
                artistId: body.artistId
            }
        })
        if (existInteraction) {
            const editInteraction = await User_artist.update(body, {
                where: {
                    email: userEmail,
                    artistId: body.artistId
                }
            });
            res.json(editInteraction);
        } else {
            const newInteraction = await User_artist.create(body);
            res.json(newInteraction);
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/artists/byUser", async (req, res) => {
    try {
        const allInteractions = await User_artist.findAll({
            where: {
                email: req.userEmail
            },
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/UserArtists", async (req, res) => {
    try {
        const allInteractions = await User_artist.findAll({
            where:
            {
                [Op.or]: [
                    { email: req.userEmail }
                ],
                id: { [Op.in]: req.body }
            },
            include: [{
                model: Artist,
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
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/allPlaylists/byUser", async (req, res) => {
    try {
        const allInteractions = await User_playlist.findAll({
            where:
            {
                [Op.or]: [
                    { email: req.userEmail },
                    { email: 'david@gmail.com' }
                ]
            },
            include: [{
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
            }]
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/UserPlaylists", async (req, res) => {
    try {
        const allInteractions = await User_playlist.findAll({
            where:
                { email: req.userEmail },
            include: [{
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
            }]
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/playlist", async (req, res) => {
    try {
        const { body, userEmail } = req;
        body.email = userEmail;
        console.log(body);
        const newInteraction = await User_playlist.create(body);
        res.json(newInteraction);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = Interactions;
