const request = require('supertest');
const {app}  = require('../src/server');

describe('Authentication Routes', () => {
  describe('POST /signup', () => {
    test('should create a new user', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(201);
      expect(response.body.username).toBe('testuser');
    });
  });

  describe('POST /signin', () => {
    test('should return the user object on successful login', async () => {
      const response = await request(app)
        .post('/signin')
        .set('Authorization', `Basic ${Buffer.from('testuser:testpassword').toString('base64')}`);

      expect(response.status).toBe(201);
      expect(response.body.user.username).toBe('testuser');
    });

    test('should return "Invalid Login" on unsuccessful login', async () => {
      const response = await request(app)
        .post('/signin')
        .set('Authorization', `Basic ${Buffer.from('testuser:wrongpassword').toString('base64')}`);

      expect(response.status).toBe(500);
      expect(response.text).toBe('wrong username or password');
    });
  });
});

