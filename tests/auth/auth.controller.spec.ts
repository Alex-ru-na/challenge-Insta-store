import request from 'supertest';
import { Application } from 'express';
import Server from '../../src/modules/main/app/server';

describe('Login endpoint Test', () => {
  let app: Application;
  let server: Server;

  beforeAll(async () => {
    server = Server.getInstance();
    await server.init();
    app = server.getApp();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return 200 and valid authentication', async () => {
    const credentials = Buffer.from('test@gmail.com:123').toString('base64');
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', `Basic ${credentials}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 with incorrect credentials', async () => {
    const credentials = Buffer.from('wrong@gmail.com:badPassword').toString('base64');
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', `Basic ${credentials}`);

    expect(response.status).toBe(401);
  });

  it('should return 400 with missing credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({});

    expect(response.status).toBe(400);
  });
});
