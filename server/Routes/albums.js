const express = require('express');
const albumsRouter = express.Router();
const { Artist, Album, Song } = require('../models');
const { Op } = require("sequelize");

albumsRouter.get("/", async (req, res) => {
    try {
        const allAlbums = await Album.findAll();
        res.json(allAlbums);
    } catch (e) {
        res.json({ message: e.message });
    };
});

albumsRouter.get("/byId/:id", async (req, res) => {
    try {
        const result = await Album.findByPk(req.params.id, {
            include: [Artist, Song]
        });
        res.json(result);
    } catch (e) {
        res.json({ message: e.message });
    };
});

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
    } catch (e) {
        res.json({ message: e.message });
    };
});

albumsRouter.get("/top", async (req, res) => {
    try {
        const allAlbums = await Album.findAll({ limit: 20 });
        res.json(allAlbums);
    } catch (e) {
        res.json({ message: e.message });
    };
});

albumsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newAlbum = await Album.create(body);
        res.json(newAlbum);
    } catch (e) {
        res.json({ message: e.message });
    };
});

albumsRouter.put("/:id", async (req, res) => {
    try {
        const { body } = req;
        const editAlbum = await Album.update(body, {
            where: { id: req.params.id }
        })
        res.send(editAlbum);
    } catch (e) {
        res.json({ message: e.message });
    };
});

albumsRouter.delete("/:id", async (req, res) => {
    try {
        const result = await Album.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (e) {
        res.json({ message: e.message });
    };
});

module.exports = albumsRouter;
