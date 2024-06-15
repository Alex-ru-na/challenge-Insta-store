import request from 'supertest';
import { Application } from 'express';
import Server from '../../src/modules/main/app/server';

describe('Server Integration Tests', () => {
  let app: Application;
  let server: Server;

  beforeAll(async () => {
    server = Server.getInstance();
    await server.init();
    app = server.getApp();
  });

  afterAll(async () => {
    // clear
  });

  it('should return 200 from root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ok', true);
  });

  it('should return 401 without authorization token', async () => {
    const response = await request(app).post('/api/v1/stores/get/closer').send({});
    expect(response.status).toBe(401);
  });

  it('should return 200 and success response with valid authorization token', async () => {
    const authToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZkYjM4OGVhODg3MjhjZTk4MTliNGQiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidGltZXpvbmUiOiJBbWVyaWNhL0JvZ290YSIsImlhdCI6MTcxODQ4NzU2NiwiZXhwIjoxNzE4NTczOTY2fQ.JUQ5LTb6GyuCPMdjTUabycDMmMGIRfP8KmYpjFgJdfz4jkrbn7g5jOSJ34YQrwDviehvIt9hJOwRtMhhRNSF9YIUDUPlzXlvGSxMFtEnjQQHVr8L5D-ekc5BpZzZS-Eopu7oaFD1eaZBuSrB99yiM0fy-83Rmfl3uof889TMyV5GY2ChvxqEPv9Uf1-8lZ08f4WNiP0O79p454xCx8CRy6dz6SgfQY93NEBbkxhRDIWplzNkWiLS5zidHm23GzOGmXr2vDRpf_E9EwKzfZyOs2bddCTX_grxKrNgWnbIHV6GWhU8WvoEf0PVVoxz2kHbFzUIQh13OCDFNrMc2fyRyA"; // Agrega un token de autenticación válido para tus pruebas
    const requestBody = {
      client: {
        _id: '1',
        name: 'John Doe',
        timezone: 'America/Bogota',
        location: {
          iso3_country: 'COL',
          city: 'Medellin',
          state: 'Antioquia',
          coordinates: [40.7128, -74.0060],
        },
      },
    };

    const response = await request(app)
      .post('/api/v1/stores/get/closer')
      .set('Authorization', `Bearer ${authToken}`)
      .send(requestBody);

    expect(response.status).toBe(200);
  });
});
