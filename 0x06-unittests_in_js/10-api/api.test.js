const request = require('supertest');
const app = require('./api');

describe('API Endpoints', () => {
	... (previous test suites)

	describe('POST /login', () => {
		it('should return a welcome message', async () => {
			const response = await request(app).post('/login').send({ userName: 'John Doe' });
			expect(response.status).toBe(200);
			expect(response.text).toBe('Welcome John Doe');
		});

		it('should return an error if userName is missing', async () => {
			const response = await request(app).post('/login').send({});
			expect(response.status).toBe(400);
		});
	});

	describe('GET /available_payments', () => {
		it('should return the available payment methods', async () => {
			const response = await request(app).get('/available_payments');
			expect(response.status).toBe(200);
			expect(response.body).toEqual({
				payment_methods: {
					credit_cards: true,
					paypal: false
				}
			});
		});
	});
});
