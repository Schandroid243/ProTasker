/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('Health check', () => {
  it('should return status 200 ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    console.log(res.body);
  });
});
