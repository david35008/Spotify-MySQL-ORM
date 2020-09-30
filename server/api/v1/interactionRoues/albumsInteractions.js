const express = require('express');
const AlbumsInteractions = express.Router();
const {  User_album, Song, Artist, Album } = require('../../../models');
const { Op } = require("sequelize");

AlbumsInteractions.get("/userInteractions", async (req, res) => {
    try {
        const allInteractions = await User_album.findAll({
            where: {
                email: req.decoded.user
            },
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

AlbumsInteractions.post("/", async (req, res) => {
    try {
        const { body, userEmail } = req;
        body.email = userEmail;
        const existInteraction = await User_album.findOne({
            where: {
                email: userEmail,
                albumId: body.albumId
            }
        })
        if (existInteraction) {
            const editInteraction = await User_album.update(body, {
                where: {
                    email: userEmail,
                    albumId: body.albumId
                }
            });
            res.json(editInteraction);
        } else {
            const newInteraction = await User_album.create(body);
            res.json(newInteraction);
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

AlbumsInteractions.post("/byUser", async (req, res) => {
    try {
        const allInteractions = await User_album.findAll({
            where: {
                email: req.decoded.user,
                albumId: { [Op.in]: req.body }
            },
            include: [{
                model: Album,
                include: [{
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
                }],
            }
            ]
        })
        res.json(allInteractions)
    } catch (e) {
        res.status(400).json({ message: e.message });
    };
});

module.exports = AlbumsInteractions;
