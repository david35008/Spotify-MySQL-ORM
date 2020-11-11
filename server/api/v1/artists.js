const express = require('express');
const artistsRouter = express.Router();
const checkAdmin = require('../../helpers/checkAdmin');
const { Artist, Album, Song } = require('../../models');
const { Op } = require("sequelize");

// get all artists
artistsRouter.get("/", async (req, res) => {
    try {
        const allArtists = await Artist.findAll({
            include: [{
                model: Album,
                attributes: ["name"]
            }, {
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
            }
            ]
        });
        res.json(allArtists);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get artist filtered by id from params
artistsRouter.get('/byId/:id', async (req, res) => {
    try {
        const result = await Artist.findByPk(req.params.id, {
            include: [Album, {
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
            }]
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get artist filtered by name from params
artistsRouter.get("/byName/:name", async (req, res) => {
    try {
        const result = await Artist.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get top 20 artists
artistsRouter.get("/top", async (req, res) => {
    try {
        const allArtists = await Artist.findAll({ limit: 20 });
        res.json(allArtists);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

//============================== Admin Routes ======================================//

// create new artist
artistsRouter.post("/", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const newAtrist = await Artist.create(body);
        res.json(newAtrist);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// update artist information
artistsRouter.put("/:id", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const editArtist = await Artist.update(body, {
            where: { id: req.params.id }
        })
        res.json(editArtist);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// delete artist
artistsRouter.delete("/:id", checkAdmin, async (req, res) => {
    try {
        const result = await Artist.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = artistsRouter;
