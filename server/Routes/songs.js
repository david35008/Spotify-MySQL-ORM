const express = require('express');
const songsRouter = express.Router();
const { Artist, Album, Song } = require('../models');
const { Op } = require("sequelize");

songsRouter.get("/", async (req, res) => {
  try {
    const allSongs = await Song.findAll();
    res.json(allSongs);
} catch (e) {
    res.json({ message: e.message });
};
});

songsRouter.get("/byId/:id", async (req, res) => {
  try {
    const result = await Song.findByPk(req.params.id, {
        include: [Album, Artist]
    });
    res.json(result);
} catch (e) {
    res.json({ message: e.message });
};
});

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
} catch (e) {
    res.json({ message: e.message });
};
});

songsRouter.get("/top", async (req, res) => {
  try {
    const allSongs = await Song.findAll({ limit: 20 });
    res.json(allSongs);
} catch (e) {
    res.json({ message: e.message });
};
});

songsRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newSong = await Song.create(body);
    res.json(newSong);
} catch (e) {
    res.json({ message: e.message });
};
});

songsRouter.put("/:id", async (req, res) => {
  try {
    const { body } = req;
    const editSong = await Song.update(body, {
        where: { id: req.params.id }
    })
    res.send(editSong);
} catch (e) {
    res.json({ message: e.message });
};
});

songsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Song.destroy({
        where: { id: req.params.id }
    })
    res.json(result);
} catch (e) {
    res.json({ message: e.message });
};
});

module.exports = songsRouter;
