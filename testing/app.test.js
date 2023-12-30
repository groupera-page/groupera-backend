const request = require('supertest')
const app = require('../app')

describe('Post users', () => {
	describe('Given a username and password', () => {
		test('Should respond with 200 status code', async () => {
			const response = await request(app).post('/signup').send({
				username: 'username',
				password: 'Password123',
			})
			expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
		})
	})

	// describe('Missing a username', () => {})
})
