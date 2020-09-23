const express = require('express');
const artistsRouter = express.Router();
const { Artist, Album, Song } = require('../models')
const { Op } = require("sequelize");

artistsRouter.get("/", async (req, res) => {
    try {
        const allArtists = await Artist.findAll();
        res.json(allArtists);
    } catch (e) {
        res.json({ message: e.message })
    }
})

artistsRouter.get('/byId/:id', async (req, res) => {
    try {
        const result = await Artist.findByPk(req.params.id, {
            attributes: ['id', 'name', 'createdAt', 'updatedAt', ['cover_img', 'image'], 'description'],
            include: [Album, Song]
        })
        res.json(result);
    } catch (e) {
        res.json({ message: e.message })
    }
})


artistsRouter.get("/byName/:name", async (req, res) => {
    try {
        const result = await Artist.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        })
        res.json(result);
    } catch (e) {
        res.json({ message: e.message })
    }
})

artistsRouter.get("/top", async(req, res) => {
    try {
        const allArtists = await Artist.findAll({ limit: 20 });
        res.json(allArtists);
    } catch (e) {
        res.json({ message: e.message })
    }
})

artistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const newAtrist = await Artist.create(body)
        console.log(newAtrist);
        res.json(newAtrist)
    } catch (e) {
        res.json({ message: e.message })
    }
})

artistsRouter.put("/:id", async (req, res) => {
    try {
        const { body } = req;
        const editArtist = await Artist.update(body, {
            where: { id: req.params.id }
        })
        res.send(editArtist)
    } catch (e) {
        res.json({ message: e.message })
    }
})

artistsRouter.delete("/:id", async (req, res) => {
    try {
        const result = await Artist.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (e) {
        res.json({ message: e.message })
    }
})

module.exports = artistsRouter;
