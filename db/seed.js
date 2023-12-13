require('dotenv').config();
require('./index')

const {faker} = require('@faker-js/faker');

const {User} = require('../models/User.model');
const {Group} = require('../models/Group.model');
const {Meeting} = require('../models/Meeting.model');

const groupTopics = require('../utils/groupTopics')

// const mongoose = require('mongoose')
const {hashSomething} = require('../controllers/authControllers');

const topicArray =  groupTopics.map(t => t.value)

const genderOptions = ['male', 'female', 'divers']

const seed = async () => {
	// await connectDB()
	// Clear the existing data

	await User.deleteMany({});
	await Group.deleteMany({});
	await Meeting.deleteMany({});

	// Let's create some random users and groups
	const users = [];
	const groups = [];

	let password = await hashSomething('test-Test1')

	// Create fixed Test Account
	users.push(new User({
		_id: '65723392877b149a5f908b06',
		alias: 'Test Primary',
		passwordHash: password,
		email: 'test@test.de',
		emailVerified: true,
		emailVerificationExpires: null,
		gender: 'male',
		terms: true
	}))
		

	for (let i = 0; i < 50; i++) {
		// eslint-disable-next-line no-useless-escape
		password = await hashSomething(faker.internet.password({memorable: true, pattern: '^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$'}))

		users.push(new User({
			_id: faker.database.mongodbObjectId(),
			alias: faker.internet.userName(),
			email: faker.internet.email(),
			passwordHash: password,
			emailVerified: true,
			emailVerificationExpires: null,
			gender: genderOptions[Math.floor(Math.random() * genderOptions.length)],
			joinedGroups: [],
			moderatedGroups: [],
			terms: true
		}));
	}

	let selfModerated

	for (let i = 0; i < 10; i++) {
		selfModerated = Math.random() > 0.4
		groups.push(new Group({
			_id: faker.database.mongodbObjectId(),
			name: faker.lorem.word(),
			description: faker.lorem.words({ min: 1, max: 50 }),
			topic: topicArray[Math.floor(Math.random() * topicArray.length)],
			moderator: users[Math.floor(Math.random() * users.length)]._id,
			verified: selfModerated,
			selfModerated: selfModerated,
			members: []
		}));
	}

	// Randomly adding users to groups and some users as moderators
	users.forEach(user => {
		groups.forEach(group => {
			if (group.moderator.equals(user._id)) {
				user.moderatedGroups.push(group._id);
			} else if(Math.random() > 0.5) {
				user.joinedGroups.push(group._id);
				group.members.push(user._id);
			}
		});
	});

	// Save everything to the database
	await Promise.all(users.map(user => user.save()));
	await Promise.all(groups.map(group => group.save()));

	console.log('Database seeded! 🌱');
}

seed().then(() => process.exit());