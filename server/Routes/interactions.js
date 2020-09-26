const express = require('express');
const Interactions = express.Router();
const { Interaction } = require('../models');

Interactions.get("/", async (req, res) => {
    try {
        const allInteractions = await Interaction.findAll()
        res.json(allInteractions)
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
});

Interactions.post("/", async (req, res) => {
    try {
        const { body, userId } = req;
        body.userId = userId;
        console.log(body);
        const newInteraction = await Interaction.create(body);
        res.json(newInteraction);
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = Interactions;
