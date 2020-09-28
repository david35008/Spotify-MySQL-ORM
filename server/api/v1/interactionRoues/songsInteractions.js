const express = require('express');
const SongsInteractions = express.Router();
const { Interaction } = require('../../../models');

SongsInteractions.get("/", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll()
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

SongsInteractions.get("/byUser", async (req, res) => {
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

SongsInteractions.post("/", async (req, res) => {
    try {
        const { body, userId } = req;
        body.userId = userId;
        const newInteraction = await Interaction.create(body);
        res.json(newInteraction);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

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
    } catch (e) {
        res.json({ message: e.message });
    };
});


module.exports = SongsInteractions;
