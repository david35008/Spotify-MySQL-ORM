
const request = require('supertest');
const server = require('../server');
const { Playlists_Song } = require('../models');

const songsInPlaylistsMock = {
    playlist_id: 1,
    song_id: 1
}

describe('check songsInPlaylists routs', () => {
    afterAll(async () => {
        await server.close();
        done();
    });
  beforeEach(async () => {
    await Playlists_Song.destroy({ truncate: true, force: true });
  });

  it('Can create new song in playlist', async () => {
    const { body } = await request(server).post('/songsInPlaylists').send(songsInPlaylistsMock);
    expect(body.playlist_id).toBe(songsInPlaylistsMock.playlist_id)
    expect(body.song_id).toBe(songsInPlaylistsMock.song_id)
  })

  it('Can remove song from playlist', async () => {
    const { body } = await request(server).delete(`/songsInPlaylists?song_id=${songsInPlaylistsMock.song_id}&playlist_id=${songsInPlaylistsMock.playlist_id}`)
    console.log(body);
    expect(body).toBe(0)
  })
})