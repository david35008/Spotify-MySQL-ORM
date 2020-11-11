const express = require('express');
const ArtistsInteractions = express.Router();
const {  User_artist, Song, Artist, Album } = require('../../../models');
const { Op } = require("sequelize");

// get all artists interactions
ArtistsInteractions.get("/userInteractions", async (req, res) => {
    try {
        const allInteractions = await User_artist.findAll({
            where: {
                email: req.decoded.email
            },
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(allInteractions)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get artists interactions filtered by user email
ArtistsInteractions.post("/", async (req, res) => {
    try {
        const { body } = req;
        body.email = req.decoded.email;
        const existInteraction = await User_artist.findOne({
            where: {
                email: req.decoded.email,
                artistId: body.artistId
            }
        })
        if (existInteraction) {
            const editInteraction = await User_artist.update(body, {
                where: {
                    email: req.decoded.email,
                    artistId: body.artistId
                }
            });
            res.json(editInteraction);
        } else {
            const newInteraction = await User_artist.create(body);
            res.json(newInteraction);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// create new interaction with a artist
ArtistsInteractions.post("/byUser", async (req, res) => {
    try {
        const allInteractions = await User_artist.findAll({
            where:
            {
                [Op.or]: [
                    { email: req.decoded.email }
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
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = ArtistsInteractions;
