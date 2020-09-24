
const request = require('supertest');
const server = require('../server');
const { PlaylistsSong } = require('../models');

const songsInPlaylistsMock = {
    playlistId: 1,
    songId: 1
}

describe('check songsInPlaylists routs', () => {
    afterAll(async () => {
        await server.close();
        done();
    });
  beforeEach(async () => {
    await PlaylistsSong.destroy({ truncate: true, force: true });
  });

  it('Can create new song in playlist', async () => {
    const { body } = await request(server).post('/songsInPlaylists').send(songsInPlaylistsMock);
    expect(body.playlistId).toBe(songsInPlaylistsMock.playlistId)
    expect(body.songId).toBe(songsInPlaylistsMock.songId)
  })

  it('Can remove song from playlist', async () => {
    const { body } = await request(server).delete(`/songsInPlaylists?songId=${songsInPlaylistsMock.songId}&playlistId=${songsInPlaylistsMock.playlistId}`)
    console.log(body);
    expect(body).toBe(0)
  })
})