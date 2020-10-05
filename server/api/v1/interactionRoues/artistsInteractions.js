const express = require('express');
const ArtistsInteractions = express.Router();
const {  User_artist, Song, Artist, Album } = require('../../../models');
const { Op } = require("sequelize");

ArtistsInteractions.get("/userInteractions", async (req, res) => {
    try {
        const allInteractions = await User_artist.findAll({
            where: {
                email: req.decoded.user
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

ArtistsInteractions.post("/", async (req, res) => {
    try {
        const { body, decoded } = req;
        body.email = decoded.user;
        const existInteraction = await User_artist.findOne({
            where: {
                email: decoded.user,
                artistId: body.artistId
            }
        })
        if (existInteraction) {
            const editInteraction = await User_artist.update(body, {
                where: {
                    email: decoded.user,
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

ArtistsInteractions.post("/byUser", async (req, res) => {
    try {
        const allInteractions = await User_artist.findAll({
            where:
            {
                [Op.or]: [
                    { email: req.decoded.user }
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

module.exports = ArtistsInteractions;
