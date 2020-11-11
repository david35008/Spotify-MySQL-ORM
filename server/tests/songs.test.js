
/**
 * @jest-environment node
 */

require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcrypt');
const { Song, Album, Artist, User } = require('../models');
const { Op } = require("sequelize");

const userMock = {
    name: 'test3',
    isAdmin: true,
    email: 'test3@test.com',
    password: process.env.PASSWORD,
    rememberToken: false
}

const artistMock = {
    name: 'new artist name',
}

const albumMock = {
    name: 'new album name',
}

const songMock = {
    name: 'new song name',
}

const songChaengeMock = {
    name: 'change song name'
}

let header;

describe('check songs routs', () => {
    beforeAll(async () => {
        userMock.password = await bcrypt.hash(process.env.PASSWORD, 10);
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

        songMock.artistId = newArtist.id
        albumMock.artistId = newArtist.id
        const { body: newAlbum } = await request(server)
            .post('/api/v1/albums')
            .set('Authorization', header['authorization'])
            .send(albumMock)
            .expect(200);

        songMock.albumId = newAlbum.id
    })
    afterAll(async () => {
        await User.destroy({ truncate: true, force: true });
        await Artist.destroy({ truncate: true, force: true });
        await Album.destroy({ truncate: true, force: true });
        await server.close();
    });
    afterEach(async () => {
        await Song.destroy({ truncate: true, force: true });
    });

    it('Can get all songs', async () => {
        const { body: newSong } = await request(server)
            .post('/api/v1/songs')
            .set('Authorization', header['authorization'])
            .send(songMock)
            .expect(200);

        const { body: getAllSongs } = await request(server)
            .get(`/api/v1/songs`)
            .set('Authorization', header['authorization'])
            .expect(200);

        expect(getAllSongs.length > 0).toBe(true);
        const songsFromDB = await Song.findAll();
        expect(songsFromDB.length > 0).toBe(true);
        expect(songsFromDB.length).toBe(getAllSongs.length);
    })

    it('Can get single song by id', async () => {
        const { body: newSong } = await request(server)
            .post('/api/v1/songs')
            .set('Authorization', header['authorization'])
            .send(songMock)
            .expect(200);

        const { body: getSingleSong } = await request(server)
            .get(`/api/v1/songs/byId/${newSong.id}`)
            .set('Authorization', header['authorization'])
            .expect(200);

        const songFromDB = await Song.findByPk(newSong.id);
        expect(songFromDB.name).toBe(songMock.name);
        expect(getSingleSong.name).toBe(songMock.name);
        expect(getSingleSong.id).toBe(newSong.id);
    })

    it('Can get single song by name', async () => {
        const { body: newSong } = await request(server)
            .post('/api/v1/songs')
            .set('Authorization', header['authorization'])
            .send(songMock)
            .expect(200);

        const { body: getSingleSong } = await request(server)
            .get(`/api/v1/songs/byName/${newSong.name}`)
            .set('Authorization', header['authorization'])
            .expect(200);

        const songFromDB = await Song.findAll({ where: { name: { [Op.like]: `%${songMock.name}%` } } });
        expect(songFromDB[0].name).toBe(newSong.name);
        expect(getSingleSong[0].name).toBe(songMock.name);
        expect(getSingleSong[0].id).toBe(newSong.id);
    })

    it('Can get top songs', async () => {
        for (let i = 0; i < 21; i++) {
            songMock.name = `new song name ${i}`
            await request(server)
                .post('/api/v1/songs')
                .set('Authorization', header['authorization'])
                .send(songMock)
                .expect(200);
        }

        const { body: getTopSongs } = await request(server)
            .get(`/api/v1/songs/top`)
            .set('Authorization', header['authorization'])
            .expect(200);

        expect(getTopSongs.length <= 20).toBe(true);
        const topSongsFromDB = await Song.findAll({ limit: 20 });
        expect(topSongsFromDB.length <= 20).toBe(true);
        expect(topSongsFromDB.length).toBe(getTopSongs.length)
    })

    it("Can create song", async () => {
        const { body: newSong } = await request(server)
            .post('/api/v1/songs')
            .set('Authorization', header['authorization'])
            .send(songMock)
            .expect(200);
        songMock.id = newSong.id;

        const songFromDB = await Song.findByPk(songMock.id);
        expect(songFromDB.name).toBe(songMock.name);
    });

    it('Can change song', async () => {
        const { body: newSong } = await request(server)
            .post('/api/v1/songs')
            .set('Authorization', header['authorization'])
            .send(songMock)
            .expect(200);

        await request(server)
            .put(`/api/v1/songs/${newSong.id}`)
            .set('Authorization', header['authorization'])
            .send(songChaengeMock)
            .expect(200);

        const songFromDB = await Song.findByPk(newSong.id);
        expect(songFromDB.name).toBe(songChaengeMock.name);
    })

    it('Can delete song', async () => {
        const { body: newSong } = await request(server)
            .post('/api/v1/songs')
            .set('Authorization', header['authorization'])
            .send(songMock)
            .expect(200);

        await request(server)
            .delete(`/api/v1/songs/${newSong.id}`)
            .set('Authorization', header['authorization'])
            .expect(200);

        const songFromDB = await Song.findByPk(newSong.id);
        expect(songFromDB).toBe(null);
    })
})