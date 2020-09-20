const express = require('express');
const playlistsRouter = express.Router();
const DataBase = require('../connection');

playlistsRouter.get("/", (req, res) => {
    DataBase.query("SELECT * FROM playlists", (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.")
        } else {
            res.json(result);
        }
    });
})

playlistsRouter.get("/byId/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }

    DataBase.query(`SELECT songs.*, 
    playlists.name AS playlist_name,
    playlists.playlist_ID,
    playlists.created_at AS playlist_create,
    playlists.upload_at AS playlist_upload,
    playlists.cover_img AS playlist_cover,
    albums.name As album_name,
    albums.cover_img,
    artists.name As artist_name 
    FROM songs
      JOIN artists ON artists.artist_ID = songs.artist_ID
      JOIN albums ON albums.album_ID = songs.album_ID 
      JOIN playlists_songs ON playlists_songs.song_id = songs.song_ID
      JOIN playlists ON playlists_songs.playlist_ID = playlists.playlist_ID
      WHERE playlists_songs.playlist_ID = ${req.params.id}`, (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such playlist");
        } else {
            res.json(result);
        }
    });
})

playlistsRouter.get("/byName/:name", (req, res) => {
    DataBase.query(`SELECT playlists.* 
    FROM playlists 
    WHERE playlists.name LIKE '%${req.params.name}%'`, (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result.length < 1) {
            res.status(404).json("There is no such song");
        } else {
            res.json(result);
        }
    });
})

playlistsRouter.get("/top", (req, res) => {
    DataBase.query(`SELECT * FROM playlists LIMIT 20`, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json(result);
        }
    });
})

playlistsRouter.post("/", (req, res) => {
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req;
    const queryString = `INSERT INTO playlists SET ?`;
    DataBase.query(queryString, body, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json("1 playlist successfully inserted into db");
        }
    });
})

playlistsRouter.put("/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req;
    const queryString = `UPDATE playlists SET ? WHERE playlist_ID=${req.params.id}`;
    DataBase.query(queryString, body, (err, result) => {
        if (err) {
            res.json("An error occurred.");
        } else {
            res.json("1 playlist updated");
        }
    })
})

playlistsRouter.delete("/:id", (req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).json('Id must be a number')
    }
    DataBase.query(`DELETE FROM playlists WHERE playlist_ID= ${req.params.id}`, (err, result) => {
        if (err) res.json("An error occurred.");
        res.json("One playlist deleted");
    });
})

playlistsRouter.post("/songs", (req, res) => {
    if (!req.body) {
        res.status(400).json("content missing")
    }
    const { body } = req;
    console.log(body);
    const queryString = `INSERT INTO playlists_songs SET ?`;
    DataBase.query(queryString, body, (err, result) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else {
            res.json("1 playlists_songs successfully inserted into db");
        }
    })
})

playlistsRouter.delete("songs", (req, res) => {
    console.log(req.query);
    DataBase.query(`DELETE FROM playlists_songs WHERE playlist_ID= ${req.query.playlistID}
    AND song_ID = ${req.query.songID}`, (err, result) => {
        if (err) res.json("An error occurred.");
        res.json("One playlists_songs deleted");
    })
})

module.exports = playlistsRouter;
