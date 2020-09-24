
const request = require('supertest');
const server = require('../server');
const { Artist } = require('../models');

const artistMock = {
  name: 'new artist name'
}

const artistChaengeMock = {
  name: 'change artist name'
}

describe('check artists routs', () => {
  afterAll(async () => {
    await server.close();
    done();
  });
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it('Can create artist', async () => {
    const { body } = await request(server).post('/artists').send(artistMock);
    artistMock.id = body.id;
    const artistFromDB = await Artist.findByPk(artistMock.id);
    expect(artistFromDB.name).toBe(artistMock.name)
  })
  
  // it('Can change artist', async () => {
  //   console.log(artistMock);
  //   const { body } = await request(server).put(`/artists/${artistMock.id}`).send(artistChaengeMock);
  //   expect(body).toBe(1)
  // })

  it('Can get single artist', async () => {
    const { body: newArtist } = await request(server).post('/artists').send(artistMock);
    const { body: getSingleArtistResponseBody } = await request(server).get(`/artists/byId/${newArtist.id}`);

    expect(getSingleArtistResponseBody.name).toBe(artistMock.name)
    expect(getSingleArtistResponseBody.id).toBe(newArtist.id)
  })
})