
/**
 * @jest-environment node
 */

require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcrypt');
const { Playlist, PlaylistsSong, Song, Album, Artist, User } = require('../models');
const { Op } = require("sequelize");

const playlistMock = {
  name: 'new playlist name',
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

const songInPlaylistMock = {}

const userMock = {
  name: 'test4',
  isAdmin: true,
  email: 'test4@test.com',
  password: process.env.PASSWORD,
  rememberToken: false
}


let header;

describe('check songInPlaylist routs', () => {
  beforeAll(async () => {
    userMock.password = await bcrypt.hash(process.env.PASSWORD, 10);
    await User.create(userMock);

    userMock.password = process.env.PASSWORD;
    const response = await request(server)
      .post("/users/logIn")
      .send(userMock)
      .expect(200);

    header = response.header;

    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    songInPlaylistMock.playlistId = newPlaylist.id;

    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    songMock.artistId = newArtist.id;
    albumMock.artistId = newArtist.id;

    const { body: newAlbum } = await request(server)
      .post('/api/v1/albums')
      .set('Authorization', header['authorization'])
      .send(albumMock)
      .expect(200);

    songMock.albumId = newAlbum.id;

    const { body: newSong } = await request(server)
      .post('/api/v1/songs')
      .set('Authorization', header['authorization'])
      .send(songMock)
      .expect(200);

    songInPlaylistMock.songId = newSong.id;

  })
  afterAll(async () => {
    await User.destroy({ truncate: true, force: true });
    await Song.destroy({ truncate: true, force: true });
    await Album.destroy({ truncate: true, force: true });
    await Artist.destroy({ truncate: true, force: true });
    await Playlist.destroy({ truncate: true, force: true });
    await server.close();
  });
  afterEach(async () => {
    await PlaylistsSong.destroy({ truncate: true, force: true });
  });

  it("Can add song to playlist", async () => {
    const { body: newSongInPlaylist } = await request(server)
      .post('/api/v1/songsInPlaylists')
      .set('Authorization', header['authorization'])
      .send(songInPlaylistMock)
      .expect(200);

    expect(newSongInPlaylist.songId).toBe(songInPlaylistMock.songId)
    expect(newSongInPlaylist.playlistId).toBe(songInPlaylistMock.playlistId)
    await timeout(200);
    const songInPlaylistFromDB = await PlaylistsSong.findOne({ where: { [Op.and]: [{ playlistId: newSongInPlaylist.playlistId }, { songId: newSongInPlaylist.songId }] } });
    await timeout(200);
    expect(songInPlaylistFromDB.songId).toBe(newSongInPlaylist.songId)
    expect(songInPlaylistFromDB.playlistId).toBe(newSongInPlaylist.playlistId)
  });

  it('Can delete song from playlist', async () => {
    const { body: newSongInPlaylist } = await request(server)
      .post('/api/v1/songsInPlaylists')
      .set('Authorization', header['authorization'])
      .send(songInPlaylistMock)
      .expect(200);

    await request(server)
      .delete(`/api/v1/songsInPlaylists?playlistId=${newSongInPlaylist.playlistId}&songId=${newSongInPlaylist.songId}`)
      .set('Authorization', header['authorization'])
      .expect(200);

    await timeout(200);
    const songInPlaylistFromDB = await PlaylistsSong.findOne({ where: { [Op.and]: [{ playlistId: newSongInPlaylist.playlistId }, { songId: newSongInPlaylist.songId }] } });
    expect(songInPlaylistFromDB).toBe(null)
  })
})

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
