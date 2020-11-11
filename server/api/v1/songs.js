const express = require('express');
const songsRouter = express.Router();
const checkAdmin = require('../../helpers/checkAdmin');
const { Artist, Album, Song } = require('../../models');
const { Op } = require("sequelize");

// get all songs
songsRouter.get("/", async (req, res) => {
    try {
        const allSongs = await Song.findAll();
        res.json(allSongs);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get song filtered by id from params
songsRouter.get("/byId/:id", async (req, res) => {
    try {
        const result = await Song.findByPk(req.params.id, {
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

// get song filtered by name from params
songsRouter.get("/byName/:name", async (req, res) => {
    try {
        const result = await Song.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});

// get top 20 songs
songsRouter.get("/top", async (req, res) => {
    try {
        const allSongs = await Song.findAll({
            limit: 20, include: [
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
        res.json(allSongs);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});

//============================== Admin Routes ======================================//

// create new song
songsRouter.post("/", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const newSong = await Song.create(body);
        res.json(newSong);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});

// update song information
songsRouter.put("/:id", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const editSong = await Song.update(body, {
            where: { id: req.params.id }
        })
        res.json(editSong);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});

// delete song
songsRouter.delete("/:id", checkAdmin, async (req, res) => {
    try {
        const result = await Song.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});

module.exports = songsRouter;
