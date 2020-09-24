
const request = require('supertest');
const server = require('../server');
const { Album } = require('../models');

const albumMock = {
    name: 'my album test',
    artist_id: 1
}

describe('check albums routs', () => {
    afterAll(async () => {
        await server.close();
        done();
    });
    beforeEach(async () => {
        await Album.destroy({ truncate: true, force: true });
    });

    it('Can create song', async () => {
        const { body } = await request(server).post('/albums').send(albumMock);
        expect(body.name).toBe(albumMock.name)
    })

    it('Can get single song', async () => {
        const { body: newalbum } = await request(server).post('/albums').send(albumMock);
        console.log(newalbum);
        const { body: getSinglealbumResponseBody } = await request(server).get(`/albums/byId/${newalbum.id}`);

        expect(getSinglealbumResponseBody.name).toBe(albumMock.name)
        expect(getSinglealbumResponseBody.id).toBe(newalbum.id)
    })
})