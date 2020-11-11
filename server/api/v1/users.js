const express = require('express');
const usersRouter = express.Router();
const { User } = require('../../models');
const { Op } = require("sequelize");

// get all users
usersRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.findAll({});
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });;
    };
});

// get user filtered by id from params
usersRouter.get("/byId/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// get user filtered by name from params
usersRouter.get("/byName/:name", async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// create new user
usersRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const newUser = await User.create(body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// update user information
usersRouter.put("/:id", async (req, res) => {
    try {
        const { body } = req;
        const editUser = await User.update(body, {
            where: { id: req.params.id }
        })
        res.json(editUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

// delete user
usersRouter.delete("/:id", async (req, res) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        })
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    };
});

module.exports = usersRouter;
