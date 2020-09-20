const express = require('express');
const songsRouter = express.Router();
const DataBase = require('../connection');

songsRouter.get("/", (req, res) => {
  DataBase.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name 
    FROM songs 
    JOIN albums ON songs.album_ID = albums.album_ID 
    JOIN artists ON songs.artist_ID = artists.artist_ID
    ORDER BY upload_at DESC;`, (err, result, fields) => {
    if (err) {
      res.status(400).json("An error occurred.");
    } else {
      res.json(result);
    }
  });
})

songsRouter.get("/byId/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json('Id must be a number')
  }
  DataBase.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name 
    FROM songs 
    JOIN albums ON songs.album_ID = albums.album_ID 
    JOIN artists ON songs.artist_ID = artists.artist_ID
    WHERE song_ID=${req.params.id}
    ORDER BY upload_at DESC`, (err, result) => {
    if (err) {
      res.status(400).json("An error occurred.");
    } else if (result.length < 1) {
      res.status(404).json("There is no such song");
    } else {
      res.json(result);
    }
  });
})

songsRouter.get("/byName/:name", (req, res) => {
  DataBase.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name , albums.cover_img 
  FROM songs 
  JOIN albums ON songs.album_ID = albums.album_ID 
  JOIN artists ON songs.artist_ID = artists.artist_ID 
  WHERE songs.name LIKE '%${req.params.name}%'`, (err, result, fields) => {
    if (err) {
      res.status(400).json("An error occurred.");
    } else if (result.length < 1) {
      res.status(404).json("There is no such song");
    } else {
      res.json(result);
    }
  });
})

songsRouter.get("/top", (req, res) => {
  DataBase.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name, albums.cover_img 
  FROM songs 
  JOIN albums ON songs.album_ID = albums.album_ID 
  JOIN artists ON songs.artist_ID = artists.artist_ID
  ORDER BY upload_at DESC LIMIT 20`, (err, result) => {
    if (err) {
      res.status(400).json("An error occurred.");
    } else {
      res.json(result);
    }
  });
})

songsRouter.post("/", (req, res) => {
  if (!req.body) {
      res.status(400).json("content missing")
  }
  const { body } = req;
  const queryString = `INSERT INTO songs SET ?`;
  DataBase.query(queryString, body, (err, result) => {
      if (err) {
        console.log(err);
          res.status(400).json("An error occurred.");
      } else {
          res.json("1 song successfully inserted into db");
      }
  });
})

songsRouter.put("/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json('Id must be a number')
  }
  if (!req.body) {
      res.status(400).json("content missing")
  }
  const { body } = req;
  const queryString = `UPDATE songs SET ? WHERE song_ID=${req.params.id}`;
  DataBase.query(queryString, body, (err, result) => {
      if (err) {
          res.json("An error occurred.");
      } else {
          res.json("1 song updated");
      }
  })
})

songsRouter.delete("/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json('Id must be a number')
  }
  DataBase.query(`DELETE FROM songs WHERE song_ID= ${req.params.id}`, (err, result) => {
      if (err) res.json("An error occurred.");
      res.json("One song deleted");
  });

})

module.exports = songsRouter;
