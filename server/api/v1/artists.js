const express = require('express');
const artistsRouter = express.Router();
const { Artist, Album, Song } = require('../../models');
const { Op } = require("sequelize");

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

artistsRouter.get("/top", async (req, res) => {
    try {
        const allArtists = await Artist.findAll({ limit: 20 });
        res.json(allArtists);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

// check if request is admin
artistsRouter.use((req, res, next) => {
    req.isAdmin ? next() : res.status(403).send('unaoutherized')
})

artistsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newAtrist = await Artist.create(body);
        res.json(newAtrist);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

artistsRouter.put("/:id", async (req, res) => {
    try {
        const { body } = req;
        const editArtist = await Artist.update(body, {
            where: { id: req.params.id }
        })
        res.json(editArtist);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

artistsRouter.delete("/:id", async (req, res) => {
    try {
        const result = await Artist.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = artistsRouter;
