import request from 'supertest';
import app from '../../../app';
import { Users } from '../../../infra/database/entities/users/user';
import database from '../../../infra/database/connection';
import { v4 as uuidv4 } from 'uuid';

describe('USER CONTROLLER', function () {
  // beforeAll(async () => {
  //   await database.getRepository(Users).clear();
  // });

  // afterAll(async () => {
  //   await database.getRepository(Users).clear();
  // });

  it('GET /users ==> should return an array list', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toHaveProperty('users');
  });

  it('GET /users/{id} ==> should return an specific user by ID', async () => {
    const _USER_ID = 1;

    const response = await request(app)
      .get(`/users/${_USER_ID}`)
      .set('Accept', 'application/json');

    expect(response.status).not.toBe(404);
    expect(response.status).toBe(200);
  });

  it('GET /users/{id} ==> should return Not Found error', async () => {
    const _USER_ID = 99999999;
    const response = await request(app)
      .get(`/users/${_USER_ID}`)
      .set('Accept', 'application/json');

    expect(response.status).not.toBe(200);
    expect(response.status).toBe(404);
  });

  it('POST /users ==> should create a new user', async () => {
    const _uuid = uuidv4();
    const response = await request(app)
      .post(`/users`)
      .send({ name: `teste-${_uuid}`, email: `teste-${_uuid}@email.com` })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toHaveProperty('user');
    expect(JSON.parse(response.text).user.name).toBe(`teste-${_uuid}`);
  });

  it('POST /users ==> should return email already exists error', async () => {
    const _USER_ID = 1;
    const _alreadyRegistered = await request(app)
      .get(`/users/${_USER_ID}`)
      .set('Accept', 'application/json');
    const _parsedData = JSON.parse(_alreadyRegistered.text);

    const response = await request(app)
      .post(`/users`)
      .send({ name: "Plinio Duarte", email: _parsedData?.user?.email })
      .set('Accept', 'application/json');

    expect(response.status).not.toBe(200);
    expect(response.status).toBe(400);
  });

  it('PATCH /users/{id} ==> should update attributes of a specific user', async () => {
    const _USER_ID = 1;
    const response = await request(app)
      .patch(`/users/${_USER_ID}`)
      .send({ name: "Editado" })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toHaveProperty('user');
    expect(JSON.parse(response.text).user.name).toBe('Editado');
  });

  it('PATCH /users/{id} ==> should return Not Found error', async () => {
    const _USER_ID = 99999999999;
    const response = await request(app)
      .patch(`/users/${_USER_ID}`)
      .send({ name: "Editado" })
      .set('Accept', 'application/json');

    expect(response.status).not.toBe(200);
    expect(response.status).toBe(404);
  });

  it('DELETE /users/{id} ==> should delete a specific user by id', async () => {
    const _USER_ID = 1;
    const response = await request(app)
      .delete(`/users/${_USER_ID}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });

  it('DELETE /users/{id} ==> should return Not Found error', async () => {
    const _USER_ID = 999999999999;
    const response = await request(app)
      .delete(`/users/${_USER_ID}`)
      .set('Accept', 'application/json');

    expect(response.status).not.toBe(200);
    expect(response.status).toBe(404);
  });
})