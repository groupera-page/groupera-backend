const user = {
	name: 'Chad',
	age: 45,
}

it('1 plus 1 equals 2', () => {
	expect(user).toEqual(
		expect.objectContaining({
			name: expect.any(String),
			age: expect.any(Number),
		})
	)
})
