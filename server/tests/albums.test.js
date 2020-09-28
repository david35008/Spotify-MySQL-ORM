
const request = require('supertest');
const server = require('../server');
const { Album } = require('../models');

const albumMock = {
    name: 'my album test',
    artistId: 1
}

describe('check albums routs', () => {
    // beforeAll(async () => {

    // })
    beforeEach(async () => {
        await Album.destroy({ truncate: true, force: true });
    });
    afterAll(async () => {
        await server.close();
        done();
    });

    it('Can create song', async () => {
        const { body } = await request(server).post('/api/v1/albums').send(albumMock);
        expect(body.name).toBe(albumMock.name)
    })

    it('Can get single song', async () => {
        const { body: newalbum } = await request(server).post('/api/v1/albums').send(albumMock);
        console.log(newalbum);
        const { body: getSinglealbumResponseBody } = await request(server).get(`/api/v1/albums/byId/${newalbum.id}`);

        expect(getSinglealbumResponseBody.name).toBe(albumMock.name)
        expect(getSinglealbumResponseBody.id).toBe(newalbum.id)
    })
})