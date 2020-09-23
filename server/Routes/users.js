const express = require('express');
const usersRouter = express.Router();
const DataBase = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function pad(num) { return ('00' + num).slice(-2) };

// Change the date to SQL date format
function formatDate(date) {
    let dateStr = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate() + 1)
    return dateStr;
};

usersRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name,
        email,
        password: hashedPassword,
        created_at: formatDate(new Date()),
        upload_at: formatDate(new Date())
    }
    DataBase.query(`INSERT INTO users Set ?`, newUser, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json("An error occurred.");
        } else {
            res.json("1 user successfully inserted into db");
        }
    })
})

usersRouter.post("/valid", (req, res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (error, data) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.send(true)
        }
    })
})

usersRouter.post("/logIn", (req, res) => {
    const { email, password } = req.body;
    DataBase.query(`SELECT * 
    FROM users 
    WHERE email = '${email}'`, async (err, result, fields) => {
        if (err) {
            res.status(400).json("An error occurred.");
        } else if (result[0]) {
            if (await bcrypt.compare(password, result[0].password)) {
                const user = result[0].user_ID
                const token = jwt.sign({ 
                    exp: Math.floor(Date.now() / 1000) + 10000,
                    user
                 }, process.env.SECRET_KEY)
                res.cookie('name',  result[0].name)
                res.cookie('token',  token)
                res.cookie('isAdmin',  result[0].is_admin)
                res.json({
                    name: result[0].name,
                    token
                });
            } else {
                res.status(403).json({ message: 'incorect password' });
            }
        }
    })
})

module.exports = usersRouter;
