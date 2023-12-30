const request = require('supertest')
const app = require('../app')

describe('Post users', () => {
	describe('Given a username and password', () => {
		test('Should respond with 200 status code', async () => {
			const response = await request(app).post('/auth/signup').send({
				dob: '2000-02-04',
				alias: 'Fritz M.',
				email: 'jayblez@gmail.com',
				password: 'test-password',
				gender: 'male',
				terms: true,
				questions: {
					groupTheme: ['Depression', 'Generelle Hilfe'],
					experience: 'never participated'
				}
			})
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
		})
	})

	// describe('Missing a username', () => {})
})
