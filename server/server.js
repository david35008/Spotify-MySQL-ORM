require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql');
const app = express()

app.use(express.json());

app.use(morgan(function (tokens, req, res) {
  const myTiny = [tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms']
  if (req.method === 'POST' || req.method === 'PUT') {
    return myTiny.concat([JSON.stringify(req.body)]).join(' ')
  } else {
    return myTiny.join(' ')
  }
}));

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATA_BASE
});

connection.connect((err) => {
  if (err) { throw err }
  else {
    console.log(`Connected to my sql! on ${process.env.DATA_BASE} DB`);
  }
});

app.get("/", (req, res) => {
  res.send("This is a rest api, that serves a Music Streaming service")
})

app.get("/songs", (req, res) => {
  connection.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name 
  FROM songs 
  JOIN albums ON songs.album_ID = albums.album_ID 
  JOIN artists ON songs.artist_ID = artists.artist_ID
  ORDER BY upload_at DESC;`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/song/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name 
  FROM songs 
  JOIN albums ON songs.album_ID = albums.album_ID 
  JOIN artists ON songs.artist_ID = artists.artist_ID
  WHERE song_ID=${req.params.id}
  ORDER BY upload_at DESC`, (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such song");
    } else {
      res.json(result);
    }
  });
})

app.get("/search_song/:name", (req, res) => {
  connection.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name 
  FROM songs 
  JOIN albums ON songs.album_ID = albums.album_ID 
  JOIN artists ON songs.artist_ID = artists.artist_ID 
  WHERE songs.name LIKE '%${req.params.name}%'`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such song");
    } else {
      res.json(result);
    }
  });
})

app.get("/top_songs/:limit", (req, res) => {
  connection.query(`SELECT songs.* , albums.name AS album_name , artists.name AS artist_name, albums.cover_img 
  FROM songs 
  JOIN albums ON songs.album_ID = albums.album_ID 
  JOIN artists ON songs.artist_ID = artists.artist_ID
  ORDER BY upload_at DESC LIMIT ${req.params.limit}`, (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/artists", (req, res) => {
  connection.query("SELECT artists.*, artists.name AS artist_name FROM artists", (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/artist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
    connection.query(`SELECT  artists.name, artists.created_at , artists.upload_at , artists.cover_img  AS image,
    songs.* ,albums.cover_img , albums.name AS album_name, artists.name AS artist_name FROM artists 
      JOIN songs ON songs.artist_ID = artists.artist_ID
      JOIN albums ON songs.album_ID = albums.album_ID
      WHERE artists.artist_ID= ${req.params.id}`, (err, result) => {
      if (err) {
        res.status(400).send("An error occurred.");
        throw err
      } else if (result.length < 1) {
        res.status(404).send("There is no such artist");
      } else {
        res.json(result);
      }
    });
})

app.get("/search_artist/:title", (req, res) => {
  connection.query(`SELECT * FROM artists WHERE name LIKE '%${req.params.title.toLocaleLowerCase()}%'`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such song");
    } else {
      res.json(result);
    }
  });
})

app.get("/top_artists/:limit", (req, res) => {
  connection.query(`SELECT * FROM artists LIMIT ${req.params.limit}`, (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/albums", (req, res) => {
  connection.query("SELECT albums.*, albums.name AS album_name FROM albums", (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/album/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`SELECT  albums.*,  songs.* ,albums.name AS album_name , artists.name AS artist_name FROM albums 
  JOIN songs ON songs.album_ID = albums.album_ID
  JOIN artists ON songs.artist_ID = artists.artist_ID
  WHERE albums.album_ID=${req.params.id}`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such album");
    } else {
      res.json(result);
    }
  });
})

app.get("/albums_ByArtist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`select albums.* from albums
  join  artists on artists.artist_ID=albums.artist_id
  where artists.artist_ID=${req.params.id}`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such album");
    } else {
      res.json(result);
    }
  });
})

app.get("/search_album/:title", (req, res) => {
  connection.query(`SELECT * FROM albums WHERE name LIKE '%${req.params.title}%'`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such song");
    } else {
      res.json(result);
    }
  });
})

app.get("/top_albums/:limit", (req, res) => {
  connection.query(`SELECT * FROM albums LIMIT ${req.params.limit}`, (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/playlists", (req, res) => {
  connection.query("SELECT * FROM playlists", (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/playlist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }

  connection.query(`SELECT songs.*, 
  playlists.name AS playlist_name,
  playlists.playlist_ID,
  playlists.created_at AS playlist_create,
  playlists.upload_at AS playlist_upload,
  playlists.cover_img AS playlist_cover,
  albums.name As album_name, 
  artists.name As artist_name 
  FROM songs
    JOIN artists ON artists.artist_ID = songs.artist_ID
    JOIN albums ON albums.album_ID = songs.album_ID 
    JOIN playlists_songs ON playlists_songs.song_id = songs.song_ID
    JOIN playlists ON playlists_songs.playlist_ID = playlists.playlist_ID
    WHERE playlists_songs.playlist_ID = ${req.params.id}`, (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else if (result.length < 1) {
      res.status(404).send("There is no such playlist");
    } else {
      res.json(result);
    }
  });
})

app.get("/top_playlists/:limit", (req, res) => {
  connection.query(`SELECT * FROM playlists LIMIT ${req.params.limit}`, (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else {
      res.json(result);
    }
  });
})

app.post("/song", (req, res) => {
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req;
  const queryString = `INSERT INTO songs SET ?`;
  // console.log((body.created_at))
  connection.query(queryString, body, (err, result) => {
      if (err) {
        console.log(err);
          res.status(400).send("An error occurred.");
      } else {
          res.send("1 song successfully inserted into db");
      }
  });
})

app.post("/album", (req, res) => {
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req;
  const queryString = `INSERT INTO albums SET ?`;
  connection.query(queryString, body, (err, result) => {
      if (err) {
          res.status(400).send("An error occurred.");
      } else {
          res.send("1 album successfully inserted into db");
      }
  });
})

app.post("/artist", (req, res) => {
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req
  const queryString = `INSERT INTO artists 
          SET ?`;
  connection.query(queryString, body, (err, data) => {
      if (err) {
          res.status(400).send("An error occurred.");
      } else {
          res.send("1 artist successfully inserted into db");
      }
  });
})

app.post("/playlist", (req, res) => {
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req;
  const queryString = `INSERT INTO playlists SET ?`;
  connection.query(queryString, body, (err, result) => {
      if (err) {
          res.status(400).send("An error occurred.");
      } else {
          res.send("1 playlist successfully inserted into db");
      }
  });
})

app.put("/song/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req;
  const queryString = `UPDATE songs SET ? WHERE song_ID=${req.params.id}`;
  connection.query(queryString, body, (err, result) => {
      if (err) {
          res.send("An error occurred.");
      } else {
          res.send("1 song updated");
      }
  })
})

app.put("/artist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req;
  const queryString = `UPDATE artists SET ? WHERE artist_ID=${req.params.id}`;
  connection.query(queryString, body, (err, result) => {
      if (err) {
          res.send("An error occurred.");
      } else {
          res.send("1 artist updated");
      }
  })
})

app.put("/album/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
    if (!req.body) {
        res.status(400).send("content missing")
    }
    const { body } = req;
    const queryString = `UPDATE albums SET ? WHERE album_ID=${req.params.id}`;
    connection.query(queryString, body, (err, result) => {
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 album updated");
        }
    })
})

app.put("/playlist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  if (!req.body) {
      res.status(400).send("content missing")
  }
  const { body } = req;
  const queryString = `UPDATE playlists SET ? WHERE playlist_ID=${req.params.id}`;
  connection.query(queryString, body, (err, result) => {
      if (err) {
          res.send("An error occurred.");
      } else {
          res.send("1 playlist updated");
      }
  })
})

app.delete("/song/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`DELETE FROM songs WHERE song_ID= ${req.params.id}`, (err, result) => {
      if (err) res.send("An error occurred.");
      res.send("One song deleted");
  });

})

app.delete("/artist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`DELETE FROM artists WHERE artist_ID= ${req.params.id}`, (err, result) => {
      if (err) res.send("An error occurred.");
      res.send("One artist deleted");
  });
})

app.delete("/album/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`DELETE FROM albums WHERE album_ID= ${req.params.id}`, (err, result) => {
      if (err) res.send("An error occurred.");
      res.send("One album deleted");
  });
})

app.delete("/playlist/:id", (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send('Id must be a number')
  }
  connection.query(`DELETE FROM playlists WHERE playlist_ID= ${req.params.id}`, (err, result) => {
      if (err) res.send("An error occurred.");
      res.send("One playlist deleted");
  });
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  };

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
