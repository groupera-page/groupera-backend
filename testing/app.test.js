const request = require('supertest')
const app = require('../routes/auth.routes')

describe('Post users', () => {
	describe('Given a username and password', () => {
		test('Should respond with 200 status code', async () => {
			const response = await request(app).post('/signup').send({
				username: 'username',
				password: 'password',
			})
			expect(response.statusCode).toBe(200)
		})
	})

	// describe('Missing a username', () => {})
})
