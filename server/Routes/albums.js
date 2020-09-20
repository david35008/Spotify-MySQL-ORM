const express = require('express');
const albumsRouter = express.Router();
const DataBase = require('../connection');

albumsRouter.get("/", (req, res) => {
    DataBase.query("SELECT albums.*, albums.name AS album_name FROM albums", (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.")
        } else {
            res.json(result);
        }
    });
})

albumsRouter.get("/byId/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    DataBase.query(`SELECT  albums.*,  songs.* ,albums.name AS album_name , artists.name AS artist_name FROM albums 
    JOIN songs ON songs.album_ID = albums.album_ID
    JOIN artists ON songs.artist_ID = artists.artist_ID
    WHERE albums.album_ID=${req.params.id}`, (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such album");
        } else {
            res.json(result);
        }
    });
})

albumsRouter.get("/byArtist/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    DataBase.query(`select albums.* from albums
    join  artists on artists.artist_ID=albums.artist_id
    where artists.artist_ID=${req.params.id}`, (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such album");
        } else {
            res.json(result);
        }
    });
})

albumsRouter.get("/byName/:name", (req, res) => {
    DataBase.query(`SELECT * FROM albums WHERE name LIKE '%${req.params.name}%'`, (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such song");
        } else {
            res.json(result);
        }
    });
})

albumsRouter.get("/top", (req, res) => {
    DataBase.query(`SELECT * FROM albums LIMIT 20`, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json(result);
        }
    });
})

albumsRouter.post("/", (req, res) => {
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req;
    const queryString = `INSERT INTO albums SET ?`;
    DataBase.query(queryString, body, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json("1 album successfully inserted into db");
        }
    });
})

albumsRouter.put("/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req;
    const queryString = `UPDATE albums SET ? WHERE album_ID=${req.params.id}`;
    DataBase.query(queryString, body, (err, result) => {
        if (err) {
            res.json("An error occurred.");
        } else {
            res.json("1 album updated");
        }
    })
})

albumsRouter.delete("/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    DataBase.query(`DELETE FROM albums WHERE album_ID= ${req.params.id}`, (err, result) => {
        if (err) res.json("An error occurred.");
        res.json("One album deleted");
    });
})

module.exports = albumsRouter;
