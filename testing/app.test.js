const request = require('supertest')
const app = require('../app')

// describe('Post users', () => {
// 	describe('Given a username and password', () => {
// 		test('Should respond with 200 status code', async () => {
// 			const response = await request(app).post('/auth/signup').send({
// 				dob: '2000-02-04',
// 				alias: 'Fritz M.',
// 				email: 'jayblez@gmail.com',
// 				password: 'Test-password',
// 				gender: 'male',
// 				terms: true,
// 				questions: {
// 					groupTheme: ['Depression', 'Generelle Hilfe'],
// 					experience: 'never participated'
// 				}
// 			})
// 			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
// 		})
// 	})

describe('Post groups', () => {
	describe('Given group info', () => {
		test('Should create group', async () => {
			const response = await request(app)
				.post('/group')
				.send({
					name: 'Group name 8000',
					description: 'This is a group description',
					topic: 'Depressionen',
					firstMeeting: {
						title: 'Event title 2',
						startDate: 'Tue Sep 05 2023 18:00:00 GMT+0200',
						duration: 90,
						recurrence: {
							type: 'weekly',
							days: [4],
						},
					},
				})
			expect(response.statusCode).toBe(200)
		})
	})
})
