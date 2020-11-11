const express = require('express');
const SongsInteractions = express.Router();
const { Interaction,Song,Artist,Album } = require('../../../models');
const {Op} = require('sequelize')

// get all songs interactions
SongsInteractions.get("/", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll()
        res.json(allInteractions)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get songs interactions filtered by user email
SongsInteractions.get("/byUser", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll({
            where: {
                userId: req.decoded.userId
            }
        })
        res.json(allInteractions)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// create new interaction with a song
SongsInteractions.post("/", async (req, res) => {
    try {
        const { body } = req;
        body.userId = req.decoded.userId
        const newInteraction = await Interaction.create(body);
        res.json(newInteraction);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get favorite songs filtered by user email
SongsInteractions.post("/songsByUser", async (req, res) => {
    try {
        const result = await Song.findAll({
            where: {
                id: { [Op.in]: req.body }
            },
            include: [
                {
                    model: Artist,
                    attributes: ["name"],
                },
                {
                    model: Album,
                    attributes: ["name"],
                },
            ]
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});


module.exports = SongsInteractions;
