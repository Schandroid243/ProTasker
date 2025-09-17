/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('Health check', () => {
  it('should return status 200 ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    console.log(res.body);
  });
});

describe('Tasks API', () => {
  let token;
  beforeAll(() => {
    token = jwt.sign({ id: 'userId', role: 'user' }, process.env.JWT_SECRET);
  });

  it('should not allow access without token', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toBe(401);
  });

  it('should allow access with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
