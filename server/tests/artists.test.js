
/**
 * @jest-environment node
 */

require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcryptjs');
const { Artist, User } = require('../models');
const { Op } = require("sequelize");

const artistMock = {
  name: 'new artist name',
}

const artistChaengeMock = {
  name: 'change artist name'
}

const userMock = {
  name: 'test1',
  isAdmin: true,
  email: 'test1@test.com',
  password: process.env.PASSWORD,
  rememberToken: false
}

let header;

describe('check artists routs', () => {
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
    await Artist.destroy({ truncate: true, force: true });
    await server.close();
  });
  afterEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it('Can get all artists', async () => {
    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    const { body: getAllArtists } = await request(server)
      .get(`/api/v1/artists`)
      .set('Authorization', header['authorization'])
      .expect(200);

    expect(getAllArtists.length > 0).toBe(true)
    const artistsFromDB = await Artist.findAll();
    expect(artistsFromDB.length > 0).toBe(true)
    expect(artistsFromDB.length).toBe(getAllArtists.length)
  })

  it('Can get single artist by id', async () => {
    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    const { body: getSingleArtist } = await request(server)
      .get(`/api/v1/artists/byId/${newArtist.id}`)
      .set('Authorization', header['authorization'])
      .expect(200);
    
    const artistFromDB = await Artist.findByPk(newArtist.id);
    expect(artistFromDB.name).toBe(artistMock.name)
    expect(getSingleArtist.name).toBe(artistMock.name);
    expect(getSingleArtist.id).toBe(newArtist.id);
  })

  it('Can get single artist by name', async () => {
    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    const { body: getSingleArtist } = await request(server)
      .get(`/api/v1/artists/byName/${newArtist.name}`)
      .set('Authorization', header['authorization'])
      .expect(200);

    const artistFromDB = await Artist.findAll({ where: { name: { [Op.like]: `%${artistMock.name}%` } } });
    expect(artistFromDB[0].name).toBe(newArtist.name)
    expect(getSingleArtist[0].name).toBe(artistMock.name);
    expect(getSingleArtist[0].id).toBe(newArtist.id);
  })

  it('Can get top artists', async () => {
    for (let i = 0; i < 21; i++) {
      artistMock.name = `new artist name ${i}`
      await request(server)
        .post('/api/v1/artists')
        .set('Authorization', header['authorization'])
        .send(artistMock)
        .expect(200);
    }

    const { body: getTopArtists } = await request(server)
      .get(`/api/v1/artists/top`)
      .set('Authorization', header['authorization'])
      .expect(200);

    expect(getTopArtists.length <= 20).toBe(true)
    const topArtistsFromDB = await Artist.findAll({ limit: 20 });
    expect(topArtistsFromDB.length <= 20).toBe(true);
    expect(topArtistsFromDB.length).toBe(getTopArtists.length)
  })

  it("Can create artist", async () => {
    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    const artistFromDB = await Artist.findByPk(newArtist.id);
    expect(artistFromDB.name).toBe(newArtist.name)
  });

  it('Can change artist', async () => {
    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    await request(server)
      .put(`/api/v1/artists/${newArtist.id}`)
      .set('Authorization', header['authorization'])
      .send(artistChaengeMock)
      .expect(200);

    const artistFromDB = await Artist.findByPk(newArtist.id);
    expect(artistFromDB.name).toBe(artistChaengeMock.name)
  })

  it('Can delete artist', async () => {
    const { body: newArtist } = await request(server)
      .post('/api/v1/artists')
      .set('Authorization', header['authorization'])
      .send(artistMock)
      .expect(200);

    await request(server)
      .delete(`/api/v1/artists/${newArtist.id}`)
      .set('Authorization', header['authorization'])
      .expect(200);

    const artistFromDB = await Artist.findByPk(newArtist.id);
    expect(artistFromDB).toBe(null)
  })
})