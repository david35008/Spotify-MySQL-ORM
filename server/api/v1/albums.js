const express = require('express');
const albumsRouter = express.Router();
const checkAdmin = require('../../helpers/checkAdmin');
const { Artist, Album, Song } = require('../../models');
const { Op } = require("sequelize");

// get all albums
albumsRouter.get("/", async (req, res) => {
    try {
        const allAlbums = await Album.findAll({
            include: [{
                model: Artist,
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
        res.json(allAlbums);
    } catch (e) {
        res.status(400).json({ message: error.message });;
    };
});

// get album filtered by id from params
albumsRouter.get("/byId/:id", async (req, res) => {
    try {
        const result = await Album.findByPk(req.params.id, {
            include: [Artist, {
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

// get album filtered by name from params
albumsRouter.get("/byName/:name", async (req, res) => {
    try {
        const results = await Album.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get top 20 albums
albumsRouter.get("/top", async (req, res) => {
    try {
        const allAlbums = await Album.findAll({ limit: 20 });
        res.json(allAlbums);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

//============================== Admin Routes ======================================//
// create new album
albumsRouter.post("/", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const newAlbum = await Album.create(body);
        res.json(newAlbum);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// update album information
albumsRouter.put("/:id", checkAdmin, async (req, res) => {
    try {
        const { body } = req;
        const editAlbum = await Album.update(body, {
            where: { id: req.params.id }
        })
        res.json(editAlbum);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// delete album
albumsRouter.delete("/:id", checkAdmin, async (req, res) => {
    try {
        const result = await Album.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = albumsRouter;
