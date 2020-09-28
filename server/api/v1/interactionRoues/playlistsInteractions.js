const express = require('express');
const PlaylistsInteractions = express.Router();
const { User_playlist, Song, Playlist, Artist, Album, PlaylistsSong } = require('../../../models');
const { Op } = require("sequelize");

PlaylistsInteractions.get("/all", async (req, res) => {
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

PlaylistsInteractions.get("/byUser", async (req, res) => {
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

PlaylistsInteractions.post("/", async (req, res) => {
    try {
        const { body, userEmail } = req;
        body.email = userEmail;
        const newInteraction = await User_playlist.create(body);
        res.json(newInteraction);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = PlaylistsInteractions;
