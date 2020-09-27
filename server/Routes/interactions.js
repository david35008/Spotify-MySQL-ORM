const express = require('express');
const Interactions = express.Router();
const { Interaction, User_playlist, Song, Playlist, Artist, Album, PlaylistsSong } = require('../models');
const { Op } = require("sequelize");

Interactions.get("/", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll()
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/byUser", async (req, res) => {
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

Interactions.post("/", async (req, res) => {
    try {
        const { body, userId } = req;
        body.userId = userId;
        const newInteraction = await Interaction.create(body);
        res.json(newInteraction);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.get("/playlists/byUser", async (req, res) => {
    try {
        const allUsers = await User_playlist.findAll()
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
