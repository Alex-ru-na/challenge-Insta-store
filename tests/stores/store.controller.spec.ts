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
    await server.close();
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
    const authToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZkYjM4OGVhODg3MjhjZTk4MTliNGQiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidGltZXpvbmUiOiJBbWVyaWNhL0JvZ290YSIsImlhdCI6MTcxODU0Nzk5NSwiZXhwIjoxNzE4NjM0Mzk1fQ.gd2uzSM8UWSDD4ulfgyXGJ5vZp8mpZBs2Kba82ewP0-wGWqaoiYi92vUj46CtD7SDbCI4bct0vVXowV51Fu4ON7XZ-WLpbpBY_L3TPR19YM9OOiHX5CIbSNboJDCAESkfLFSjrG_fHjZPSC7Psy7Hof2OJZJ8zr00WakjLUDKkvzG3b8NVXC0JZTifC1IajljGNzvsVdVz65vZjwTknoHusTHDxnR0xw01-Z-8NiP9ON4RxNJTMB8eNGsoG9VUGbGa8TPRiFaYpWoAeYbo3lsPAH1HZO3-RuuJ-Olj900kj9d2bTvTnro_Pc0cAGo_ZcI0_eKfbbap7nMtSTmezesA"; // Agrega un token de autenticación válido para tus pruebas
    const requestBody = {
      timezone: 'America/Bogota',
      coordinates: [40.7128, -74.0060],
    };

    const response = await request(app)
      .post('/api/v1/stores/get/closer')
      .set('Authorization', `Bearer ${authToken}`)
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('storeId');
    expect(response.body).toHaveProperty('storeName');
    expect(response.body).toHaveProperty('isOpen');
    expect(response.body).toHaveProperty('coordinates');
    expect(response.body).toHaveProperty('nextDeliveryTime');
  });
});
