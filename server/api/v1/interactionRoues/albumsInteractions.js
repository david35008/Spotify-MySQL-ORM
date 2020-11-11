const express = require('express');
const AlbumsInteractions = express.Router();
const {  User_album, Song, Artist, Album } = require('../../../models');
const { Op } = require("sequelize");

// get all albums interactions
AlbumsInteractions.get("/userInteractions", async (req, res) => {
    try {
        const allInteractions = await User_album.findAll({
            where: {
                email: req.decoded.email
            },
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(allInteractions)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get albums interactions filtered by user email
AlbumsInteractions.post("/", async (req, res) => {
    try {
        const { body } = req;
        body.email = req.decoded.email;
        const existInteraction = await User_album.findOne({
            where: {
                email: req.decoded.email,
                albumId: body.albumId
            }
        })
        if (existInteraction) {
            const editInteraction = await User_album.update(body, {
                where: {
                    email: req.decoded.email,
                    albumId: body.albumId
                }
            });
            res.json(editInteraction);
        } else {
            const newInteraction = await User_album.create(body);
            res.json(newInteraction);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// create new interaction with a album
AlbumsInteractions.post("/byUser", async (req, res) => {
    try {
        const allInteractions = await User_album.findAll({
            where: {
                email: req.decoded.email,
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
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = AlbumsInteractions;
