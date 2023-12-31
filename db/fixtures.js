require('dotenv').config();
require('./index')

const {faker} = require('@faker-js/faker');

const {User} = require('../models/User.model');
const {Group} = require('../models/Group.model');
const {Meeting} = require('../models/Meeting.model');

const {hashSomething} = require('../controllers/authControllers');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const fixedGroups = [
	{
		name: 'Depressionen',
		topic: 'Depressionen',
		description: 'Wir sind eine online Selbsthilfegruppe für Depression. Neue MitgliederInnen sind jederzeit Herzlich Willkommen. Wir starten am Dienstag den 19.12.2023 und wir arbeiten mit dem Goupera Programm für Depression. Wir freuen uns auf den Austausch.',
		meetings: [
			{ startDate: new Date('2023-12-19 18:00'), duration: 60, recurrence: { type: 'weekly', days: [2, 3] } },
		]
	},
	{
		name: 'Alkohol und Sucht',
		topic: 'Sucht',
		description: 'Wir sind alles AlkoholikerInnen oder Menschen mit einer Suchtproblematik. Wir freuen uns über jedes neue Mitglied und wir starten am 18.12.2023 und wir arbeiten mit dem Groupera Programm. Gerade über die Weihnachtszeit ist der Zusammenhalt besonders wichtig. Wir freuen uns darauf dich kennenzulernen.',
		meetings: [
			{ startDate: new Date('2023-12-18 18:00'), duration: 60, recurrence: { type: 'weekly', days: [1] } }
		]
	},
	{
		name: 'Essstörung',
		topic: 'Essstörung',
		description: 'Bei uns ist jede Essstörung Willkommen! Wir arbeiten mit dem Groupera Programm für Essstörung. Unsere Gruppe startet in der Woche zweiten Januar Woche und findet von da an wöchentlich statt. Wir freuen uns über neue MitgliederInnen und einen intensiven Austausch.',
		meetings: [
			{ startDate: new Date('2024-01-08 19:30'), duration: 60, recurrence: { type: 'weekly', days: [2] } }
		]
	},
	{
		name: 'Parkinson',
		topic: 'Chronische Erkrankungen, körperliche Einschränkungen',
		description: 'Wir sind alles Betroffene von der Erkrankung Parkinson. Wir wollen uns in schlechten und in guten Tagen der Erkrankung zur Seite stehen und unsere Erfahrungen teilen. Wir fühlen uns öfter allein mit der Erkrankung und genau das wollen wir ändern. Wir freuen uns auf neue Mitglieder und die Gruppe startet im neuen Jahr. Bitte meldet euch schon mal zu der Gruppe an. Der Tag und die Uhrzeit kann auch noch geändert werden, wenn es für die Mehrheit zu einer anderen Zeit besser passt. Wir freuen uns auf den Austausch.',
		meetings: [
			{ startDate: new Date('2024-01-03 17:30'), duration: 60, recurrence: { type: 'weekly', days: [3] } }
		]
	},
	{
		name: 'Angehörige von psychisch Erkrankten',
		topic: 'Angehörige/r von Menschen mit Erkrankungen',
		description: 'Herzlich Willkommen liebe Angehörige! Wir sind eine Gruppe von Angehörigen von psychisch Erkrankten. Dazu gehören zum Beispiel: Sucht, Depressionen, Essstörungen, Persönlichkeitsstörungen etc. Bei uns hat jeder einen Platz und freuen uns auf den Austausch und die Erfahrungen zu teilen.',
		meetings: [
			{ startDate: new Date('2024-01-04 18:00'), duration: 60, recurrence: { type: 'weekly', days: [4] } }
		]
	},
	{
		name: 'Borderline',
		topic: 'Sonstige',
		description: 'Wir möchten gerne an unseren Beziehungen arbeiten und lerne mit unserer Persönlichkeit umzugehen. Wir wissen, dass wir eine Borderline Thematik haben und wollen verstehen was dahinter steht und wie wir besser mit unseren Emotionen umgehen können. Wir freuen uns über neue Mitglieder. Die Gruppe startet am 21.12.2023 und findet wöchentlich statt.',
		meetings: [
			{ startDate: new Date('2023-12-21 19:30'), duration: 60, recurrence: { type: 'weekly', days: [4] } }
		]
	},
	{
		name: 'ADHS/ADS',
		topic: 'Sonstige',
		description: 'Wir starten im Januar im neuen Jahr und sind eine Selbsthilfegruppe für ADHS/ADS. Wir möchten gerne unsere Erfahrung mit der Störung teilen und freuen uns aus den Austausch. Der Tag und die Uhrzeit kann auch noch geändert werden.',
		meetings: [
			{ startDate: new Date('2024-01-01 18:00'), duration: 60, recurrence: { type: 'weekly', days: [1] } }
		]
	},
	{
		name: 'PTBS',
		topic: 'Sonstige',
		description: 'Wir sind eine Selbsthilfegruppe für PTBS. Bitte kläre vorher mit deinem TheraupeutIn ab, ob eine Selbsthilfegruppe für dich das richtige ist und du stabil bist. Wenn du dir unsicher sein solltest, schreib Groupera gerne eine Nachricht. Gemeinsam wollen wir heilen, unsere Erfahrungen austauschen und voneinander lernen. Wir starten im Januar im neuen Jahr.',
		meetings: [
			{ startDate: new Date('2024-01-02 18:00'), duration: 60, recurrence: { type: 'weekly', days: [2] } }
		]
	}
]


const genderOptions = ['male', 'female', 'divers']

const createVideoSDKRoom = async (meeting) => {
	const API_KEY = process.env.VIDEO_KEY
	const SECRET_KEY = process.env.VIDEO_SECRET
	const tokenOptions = { expiresIn: '120m', algorithm: 'HS256' }

	const payload = {
		apikey: API_KEY,
		version: 2,
		permissions: ['allow_join'],
	}

	const token = jwt.sign(payload, SECRET_KEY, tokenOptions)

	const url = `${process.env.VIDEOSDK_API_ENDPOINT}/v2/rooms`
	const options = {
		method: 'POST',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			autoCloseConfig: {
				type: 'session-ends',
				duration: meeting.duration,
			},
		}),
	}
	const roomInfo = await axios(url, options)

	return roomInfo.data.roomId
}

const fixtures = async () => {
	// Clear the existing data
	await User.deleteMany({});
	await Group.deleteMany({});
	await Meeting.deleteMany({});

	// Let's create some random users and groups
	const users = [];
	const groups = [];
	const meetings = [];

	let password = await hashSomething('test-Test1')
	let passwordMarie = await hashSomething('marie-Marie1')

	// Create fixed Test Account
	users.push(new User({
		_id: '65723392877b149a5f908b06',
		alias: 'Test Primary',
		passwordHash: password,
		email: 'test@test.de',
		emailVerified: true,
		emailVerificationExpires: null,
		gender: 'male',
		terms: true,
		dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
	}))

	users.push(new User({
		_id: faker.database.mongodbObjectId(),
		alias: 'Marie',
		passwordHash: passwordMarie,
		email: 'marie.gusmann@groupera.de',
		emailVerified: true,
		emailVerificationExpires: null,
		gender: 'female',
		terms: true,
		dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
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
			terms: true,
			dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
		}));
	}

	let newGroup
	let groupMeetings

	fixedGroups.map(fixedGroup => {
		newGroup = new Group({
			_id: faker.database.mongodbObjectId(),
			name: fixedGroup.name,
			description: fixedGroup.description,
			topic: fixedGroup.topic,
			moderator: users[1]._id,
			verified: true,
			selfModerated: true,
			members: []
		});
		groupMeetings = fixedGroup.meetings.map((m) => new Meeting({...m, group: newGroup._id}))

		newGroup.meetings = groupMeetings.map(m => m._id)
		groupMeetings.map((m) => meetings.push(m))
		groups.push(newGroup)
	})

	// Randomly adding users to groups and some users as moderators
	users.forEach(user => {
		groups.forEach(group => {
			if (group.moderator.equals(user._id)) {
				user.moderatedGroups.push(group._id);
			} else if(Math.random() > 0.7) {
				user.joinedGroups.push(group._id);
				group.members.push(user._id);
			}
		});
	});

	// Save everything to the database
	await Promise.all(users.map(user => user.save()));
	await Promise.all(groups.map(group => group.save()));

	await Promise.all(meetings.map(async meeting => {
		meeting.roomId = await createVideoSDKRoom(meeting)
		meeting.save()
	}));

	console.log('Database fixtures created! 🌱');
}

fixtures().then(() => process.exit());