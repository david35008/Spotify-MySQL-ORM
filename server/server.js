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
  connection.query("SELECT * FROM songs", (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/song/:id", (req, res) => {
  connection.query(`SELECT * FROM songs WHERE song_ID= ${req.params.id}`, (err, result, fields) => {
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
  connection.query(`SELECT * FROM songs LIMIT ${req.params.limit}`, (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.");
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/artists", (req, res) => {
  connection.query("SELECT * FROM artists", (err, result) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/artist/:id", (req, res) => {
    connection.query(`SELECT * FROM artists WHERE artist_ID= ${req.params.id}`, (err, result) => {
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
  connection.query("SELECT * FROM albums", (err, result, fields) => {
    if (err) {
      res.status(400).send("An error occurred.")
      throw err
    } else {
      res.json(result);
    }
  });
})

app.get("/album/:id", (req, res) => {
  connection.query(`SELECT * FROM albums WHERE album_ID= ${req.params.id}`, (err, result, fields) => {
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
  connection.query(`SELECT * FROM playlists WHERE playlist_ID= ${req.params.id}`, (err, result, fields) => {
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
  console.log(body)
  connection.query(queryString, body, (err, result) => {
      if (err) {
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
  connection.query(`DELETE FROM songs WHERE song_ID= ${req.params.id}`, (err, result) => {
      if (err) res.send("An error occurred.");
      res.send("One song deleted");
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
