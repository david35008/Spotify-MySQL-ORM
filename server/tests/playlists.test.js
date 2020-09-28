
const request = require('supertest');
const server = require('../server');
const { Playlist } = require('../models');

const playlistMock = {
  name: 'new playlist name'
}

describe('check playlists routs', () => {
    afterAll(async () => {
        await server.close();
        done();
    });
  beforeEach(async () => {
    await Playlist.destroy({ truncate: true, force: true });
  });

  it('Can create playlist', async () => {
    const { body } = await request(server).post('/api/v1/playlists').send(playlistMock);
    expect(body.name).toBe(playlistMock.name)
  })

  it('Can get single playlist', async () => {
    const { body: newPlaylist } = await request(server).post('/api/v1/playlists').send(playlistMock);
    const { body: getSinglePlaylistResponseBody } = await request(server).get(`/api/v1/playlists/byId/${newPlaylist.id}`);

    expect(getSinglePlaylistResponseBody.name).toBe(playlistMock.name)
    expect(getSinglePlaylistResponseBody.id).toBe(newPlaylist.id)
  })
})