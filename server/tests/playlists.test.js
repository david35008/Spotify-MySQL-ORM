
/**
 * @jest-environment node
 */

require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcryptjs');
const { Playlist, User } = require('../models');
const { Op } = require("sequelize");

const playlistMock = {
  name: 'new playlist name',
}

const playlistChaengeMock = {
  name: 'change playlist name'
}

const userMock = {
  name: 'test2',
  isAdmin: true,
  email: 'test2@test.com',
  password: process.env.PASSWORD,
  rememberToken: false
}

let header;

describe('check playlists routs', () => {
  beforeAll(async () => {
    userMock.password = await bcrypt.hashSync(process.env.PASSWORD, 10);
    await User.create(userMock);

    userMock.password = process.env.PASSWORD;
    const response = await request(server)
      .post("/users/logIn")
      .send(userMock)
      .expect(200);

    header = response.header;
  })
  afterAll(async () => {
    await server.close();
  });
  afterEach(async () => {
    await Playlist.destroy({ truncate: true, force: true });
  });

  it('Can get all playlists', async () => {
    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    const { body: getAllPlaylists } = await request(server)
      .get(`/api/v1/playlists`)
      .set('Authorization', header['authorization'])
      .expect(200);

    expect(getAllPlaylists.length > 0).toBe(true);
    const playlistsFromDB = await Playlist.findAll();
    expect(playlistsFromDB.length > 0).toBe(true);
    expect(playlistsFromDB.length).toBe(getAllPlaylists.length)
  })

  it('Can get single playlist by id', async () => {
    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    const { body: getSinglePlaylist } = await request(server)
      .get(`/api/v1/playlists/byId/${newPlaylist.id}`)
      .set('Authorization', header['authorization'])
      .expect(200);

    const playlistFromDB = await Playlist.findByPk(newPlaylist.id);
    expect(playlistFromDB.name).toBe(playlistMock.name)
    expect(getSinglePlaylist.name).toBe(playlistMock.name);
    expect(getSinglePlaylist.id).toBe(newPlaylist.id);
  })

  it('Can get single playlist by name', async () => {
    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    const { body: getSinglePlaylist } = await request(server)
      .get(`/api/v1/playlists/byName/${newPlaylist.name}`)
      .set('Authorization', header['authorization'])
      .expect(200);

    const playlistFromDB = await Playlist.findAll({ where: { name: { [Op.like]: `%${playlistMock.name}%` } } });
    expect(playlistFromDB[0].name).toBe(newPlaylist.name)
    expect(getSinglePlaylist[0].name).toBe(playlistMock.name);
    expect(getSinglePlaylist[0].id).toBe(newPlaylist.id);
  })

  it('Can get top playlists', async () => {
    for (let i = 0; i < 21; i++) {
      playlistMock.name = `new playlist name ${i}`
      await request(server)
        .post('/api/v1/playlists')
        .set('Authorization', header['authorization'])
        .send(playlistMock)
        .expect(200);
    }

    const { body: getTopPlaylists } = await request(server)
      .get(`/api/v1/playlists/top`)
      .set('Authorization', header['authorization'])
      .expect(200);

    expect(getTopPlaylists.length <= 20).toBe(true);
    const topPlaylistsFromDB = await Playlist.findAll({ limit: 20 });
    expect(topPlaylistsFromDB.length <= 20).toBe(true);
    expect(topPlaylistsFromDB.length).toBe(getTopPlaylists.length);
  })

  it("Can create playlist", async () => {
    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    const playlistFromDB = await Playlist.findByPk(newPlaylist.id);
    expect(playlistFromDB.name).toBe(newPlaylist.name);
  });

  it('Can change playlist', async () => {
    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    await request(server)
      .put(`/api/v1/playlists/${newPlaylist.id}`)
      .set('Authorization', header['authorization'])
      .send(playlistChaengeMock)
      .expect(200);

    const playlistFromDB = await Playlist.findByPk(newPlaylist.id);
    expect(playlistFromDB.name).toBe(playlistChaengeMock.name)
  })

  it('Can delete playlist', async () => {
    const { body: newPlaylist } = await request(server)
      .post('/api/v1/playlists')
      .set('Authorization', header['authorization'])
      .send(playlistMock)
      .expect(200);

    await request(server)
      .delete(`/api/v1/playlists/${newPlaylist.id}`)
      .set('Authorization', header['authorization'])
      .expect(200);

    const playlistFromDB = await Playlist.findByPk(newPlaylist.id);
    expect(playlistFromDB).toBe(null)
  })
})