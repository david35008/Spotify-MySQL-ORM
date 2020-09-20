const express = require('express');
const artistsRouter = express.Router();
const DataBase = require('../connection');

artistsRouter.get("/", (req, res) => {
    DataBase.query("SELECT artists.*, artists.name AS artist_name FROM artists", (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.")
        } else {
            res.json(result);
        }
    });
})

artistsRouter.get("/byId/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    DataBase.query(`SELECT  artists.name, artists.created_at , artists.upload_at , artists.cover_img  AS image, artists.description,
      songs.* ,albums.cover_img , albums.name AS album_name, artists.name AS artist_name FROM artists 
        JOIN songs ON songs.artist_ID = artists.artist_ID
        JOIN albums ON songs.album_ID = albums.album_ID
        WHERE artists.artist_ID= ${req.params.id}`, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such artist");
        } else {
            res.json(result);
        }
    });
})

artistsRouter.get("/byName/:name", (req, res) => {
    DataBase.query(`SELECT * FROM artists WHERE name LIKE '%${req.params.name.toLocaleLowerCase()}%'`, (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such song");
        } else {
            res.json(result);
        }
    });
})

artistsRouter.get("/top", (req, res) => {
    DataBase.query(`SELECT * FROM artists LIMIT 20`, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json(result);
        }
    });
})

artistsRouter.post("/", (req, res) => {
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req
    const queryString = `INSERT INTO artists 
            SET ?`;
    DataBase.query(queryString, body, (err, data) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json("1 artist successfully inserted into db");
        }
    });
})

artistsRouter.put("/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req;
    const queryString = `UPDATE artists SET ? WHERE artist_ID=${req.params.id}`;
    DataBase.query(queryString, body, (err, result) => {
        if (err) {
            res.json("An error occurred.");
        } else {
            res.json("1 artist updated");
        }
    })
})

artistsRouter.delete("/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    DataBase.query(`DELETE FROM artists WHERE artist_ID= ${req.params.id}`, (err, result) => {
        if (err) res.json("An error occurred.");
        res.json("One artist deleted");
    });
})

module.exports = artistsRouter;
