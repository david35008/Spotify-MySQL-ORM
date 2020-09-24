
const request = require('supertest');
const server = require('../server');
const { Song } = require('../models');

const songMock = {
    name: 'my first song',
    album_id: 1,
    artist_id: 1
}

describe('check songs routs', () => {
    afterAll(async () => {
        await server.close();
        done();
    });
    beforeEach(async () => {
        await Song.destroy({ truncate: true, force: true });
    });

    it('Can create song', async () => {
        const { body } = await request(server).post('/songs').send(songMock);
        expect(body.name).toBe(songMock.name)
    })

    it('Can get single song', async () => {
        const { body: newsong } = await request(server).post('/songs').send(songMock);
        console.log(newsong);
        const { body: getSingleSongResponseBody } = await request(server).get(`/songs/byId/${newsong.id}`);

        expect(getSingleSongResponseBody.name).toBe(songMock.name)
        expect(getSingleSongResponseBody.id).toBe(newsong.id)
    })
})