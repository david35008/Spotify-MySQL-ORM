const express = require('express');
const PlaylistsInteractions = express.Router();
const { User_playlist, Song, Playlist, Artist, Album, PlaylistsSong } = require('../../../models');
const { Op } = require("sequelize");

// get all playlists interactions
PlaylistsInteractions.get("/all", async (req, res) => {
    try {
        const allInteractions = await User_playlist.findAll({
            where:
            {
                [Op.or]: [
                    { email: req.decoded.email },
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
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get playlists interactions filtered by user email
PlaylistsInteractions.get("/byUser", async (req, res) => {
    try {
        const allInteractions = await User_playlist.findAll({
            where:
                { email: req.decoded.email },
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
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// create new interaction with a playlist
PlaylistsInteractions.post("/", async (req, res) => {
    try {
        const { body } = req;
        body.email = req.decoded.email;
        const newInteraction = await User_playlist.create(body);
        res.json(newInteraction);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = PlaylistsInteractions;
