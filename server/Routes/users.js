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
    try {
        const result = await User.findOne({
            where: { email: email }
        })
        if (!result) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email,
                password: hashedPassword,
                createdAt: formatDate(new Date()),
                updatedAt: formatDate(new Date())
            }
            const userResponse = await User.create(newUser);
            res.json({
                message: "1 user successfully inserted into db",
                name: userResponse.name,
                email: userResponse.email
            });
                
            } else {
            res.status(406).json({ message: 'Email alreay taken!' })
        }
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
})

usersRouter.post("/valid", (req, res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (error, data) => {
        if (error) {
            res.status(403).json({message: error});
        } else {
            res.json({ valid: true, isAdmin: data.isAdmin })
        }
    })
})

usersRouter.post("/logIn", async (req, res) => {
    const { email, password, rememberToken } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (await bcrypt.compare(password, user.password)) {
            const newToken = {
                isAdmin: user.isAdmin,
                user: user.email,
                userId: user.id,
            }
            if (!rememberToken) {
                newToken.rememberToken = rememberToken,
                    newToken.exp = Math.floor(Date.now() / 1000) + (60 * 30)
            }
            const token = jwt.sign(newToken, process.env.SECRET_KEY)
            res.cookie('name', user.name)
            res.cookie('isAdmin', user.isAdmin)
            res.cookie('token', token)
            res.cookie('user', user.email)
            res.header('Authorization', token)
            res.json(`welcome back ${user.name}`)
        } else {
            res.status(403).json({ message: 'The email or password you’ve entered doesn’t correct.' });
        }
    }  catch (e) {
        res.status(400).json({ message: e.message });
    };
})

module.exports = usersRouter;
