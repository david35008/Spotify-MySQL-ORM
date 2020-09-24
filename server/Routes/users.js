require('dotenv').config();
const express = require('express');
const usersRouter = express.Router();
const { User } = require('../models');
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
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date())
    }
    try {
        const newSong = await User.create(newUser);
        res.json("1 user successfully inserted into db");
    } catch (e) {
        res.json({ message: e.message });
    };
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

usersRouter.post("/logIn", async (req, res) => {
    const { email, password, remember_token } = req.body;
    try {
        const result = await User.findOne({ where: { email: email } });
        if (await bcrypt.compare(password, result.password)) {
            const user = result.user_ID
            const newToken ={
                isAdmin: result.is_admin,
                user
            }
            if (!remember_token) {
                newToken.exp = Math.floor(Date.now() / 1000) + 3600
            } 
            const token = jwt.sign(newToken, process.env.SECRET_KEY)
            res.cookie('name', result.name)
            res.cookie('isAdmin', result.is_admin)
            res.cookie('token', token)
            res.json(`welcome back ${result.name}`)
        } else {
            res.status(403).json({ message: 'The email or password you’ve entered doesn’t correct.' });
        }
    } catch (e) {
        res.json({ message: e.message });
    };
})

module.exports = usersRouter;
