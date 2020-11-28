
/**
 * @jest-environment node
 */

require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcryptjs');
const { Album, Artist, User } = require('../models');
const { Op } = require("sequelize");

const userMock = {
    name: 'test',
    isAdmin: true,
    email: 'test@test.com',
    password: process.env.PASSWORD,
    rememberToken: false
}

const artistMock = {
    name: 'new artist name',
}

const albumMock = {
    name: 'new album name',
}

const albumChaengeMock = {
    name: 'change album name'
}

let header;

describe('check albums routs', () => {
    beforeAll(async () => {
        userMock.password = await bcrypt.hashSync(process.env.PASSWORD, 10);
        await User.create(userMock);

        userMock.password = process.env.PASSWORD;
        const response = await request(server)
            .post("/users/logIn")
            .send(userMock)
            .expect(200);

        header = response.header;

        const { body: newArtist } = await request(server)
            .post('/api/v1/artists')
            .set('Authorization', header['authorization'])
            .send(artistMock)
            .expect(200);

        albumMock.artistId = newArtist.id
    })
    afterAll(async () => {
        await User.destroy({ truncate: true, force: true });
        await Artist.destroy({ truncate: true, force: true });
        await server.close();
    });
    afterEach(async () => {
        await Album.destroy({ truncate: true, force: true });
    });

    it('Can get all albums', async () => {
        await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);

        const { body: getAllAlbums } = await request(server)
            .get(`/api/v1/albums`)
            .set('Authorization', header['authorization'])
            .expect(200);

        expect(getAllAlbums.length > 0).toBe(true)
        const albumsFromDB = await Album.findAll();
        expect(albumsFromDB.length > 0).toBe(true)
        expect(albumsFromDB.length).toBe(getAllAlbums.length)
    })

    it('Can get single album by id', async () => {
        const { body: newAlbum } = await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);

        const { body: getSingleAlbum } = await request(server)
            .get(`/api/v1/albums/byId/${newAlbum.id}`)
            .set('Authorization', header['authorization'])
            .expect(200);

        const albumFromDB = await Album.findByPk(newAlbum.id);
        expect(albumFromDB.name).toBe(albumMock.name)
        expect(getSingleAlbum.name).toBe(albumMock.name);
        expect(getSingleAlbum.id).toBe(newAlbum.id);
    })

    it('Can get single album by name', async () => {
        const { body: newAlbum } = await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);

        const { body: getSingleAlbum } = await request(server)
            .get(`/api/v1/albums/byName/${newAlbum.name}`)
            .set('Authorization', header['authorization'])
            .expect(200);

        const albumFromDB = await Album.findAll({ where: { name: { [Op.like]: `%${albumMock.name}%` } } });
        expect(albumFromDB[0].name).toBe(newAlbum.name)
        expect(getSingleAlbum[0].name).toBe(albumMock.name);
        expect(getSingleAlbum[0].id).toBe(newAlbum.id);
    })

    it('Can get top albums', async () => {
        for (let i = 0; i < 21; i++) {
            albumMock.name = `new album name ${i}`
            await request(server)
                .post('/api/v1/albums')
                .set('Authorization', header['authorization'])
                .send(albumMock)
                .expect(200);
        }

        const { body: getTopAlbums } = await request(server)
            .get(`/api/v1/albums/top`)
            .set('Authorization', header['authorization'])
            .expect(200);

        expect(getTopAlbums.length <= 20).toBe(true)
        const topAlbumsFromDB = await Album.findAll({ limit: 20 });
        expect(topAlbumsFromDB.length <= 20).toBe(true);
        expect(topAlbumsFromDB.length).toBe(getTopAlbums.length)
    })

    it("Can create album", async () => {
        const { body: newAlbum } = await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);
        albumMock.id = newAlbum.id;

        const albumFromDB = await Album.findByPk(albumMock.id);
        expect(albumFromDB.name).toBe(albumMock.name)
    });

    it('Can change album', async () => {
        const { body: newAlbum } = await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);

        await request(server)
            .put(`/api/v1/albums/${newAlbum.id}`)
            .set('Authorization', header['authorization'])
            .send(albumChaengeMock)
            .expect(200);

        const albumFromDB = await Album.findByPk(newAlbum.id);
        expect(albumFromDB.name).toBe(albumChaengeMock.name)
    })

    it('Can delete album', async () => {
        const { body: newAlbum } = await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);

        await request(server)
            .delete(`/api/v1/albums/${newAlbum.id}`)
            .set('Authorization', header['authorization'])
            .expect(200);

        const albumFromDB = await Album.findByPk(newAlbum.id);
        expect(albumFromDB).toBe(null)
    })
})