
/**
 * @jest-environment node
 */

require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const { User } = require('../models');
const { Op } = require("sequelize");

const userMock = {
    name: 'test5',
    email: 'test5@test.com',
    password: process.env.PASSWORD,
    rememberToken: false
}

describe('check songInUser routs', () => {
    afterAll(async () => {
        await server.close();
    });
    afterEach(async () => {
        await User.destroy({ truncate: true, force: true });
    });

    it("Can register as user", async () => {
        const { body: newUser } = await request(server)
            .post('/users/register')
            .send(userMock)
            .expect(200);

        expect(newUser.name).toBe(userMock.name);
        expect(newUser.email).toBe(userMock.email);
        const UserFromDB = await User.findOne({ where: { [Op.and]: [{ name: newUser.name }, { email: newUser.email }] } });
        expect(UserFromDB.name).toBe(newUser.name);
        expect(UserFromDB.email).toBe(newUser.email);
    });

    it("Can login as user and pass validation", async () => {
        const { body: newUser } = await request(server)
            .post('/users/register')
            .send(userMock)
            .expect(200);

        const response = await request(server)
            .post("/users/logIn")
            .send(userMock)
            .expect(200);

        expect(response.body).toBe(`welcome back ${newUser.name}`);
    })
})