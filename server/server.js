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
