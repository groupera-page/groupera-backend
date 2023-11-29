/* eslint-disable no-mixed-spaces-and-tabs */
const { User } = require('../models/User.model')
const { Group } = require('../models/Group.model')

const bcrypt = require('bcryptjs')

const myCustomError = require('../utils/myCustomError')
const { getEvents, deleteEvent } = require('../utils/googleCalendar')
// const sendEmail = require('../utils/sendEmail')

// const emailTemplates = require('../lib/emailTemplates')

const hashSomething = async (thingToHash) => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT))

	return bcrypt.hash(thingToHash, salt)
}

exports.findOne = async (req, res, next) => {
	const { userId } = req.params
	const allMeetings = await getEvents()

	try {
		let user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		let groups = await Group.find()
		groups = groups.filter(
			(group) =>
				group.users.includes(user.id) || group.moderatorId == user.id
		)

		user = {
			id: user.id,
			alias: user.alias,
			email: user.email,
			dob: user.dob,
			questions: user.questions,
			emailVerified: user.emailVerified,
			gender: user.gender,
			groups: groups.map((group) => {
				return (group = {
					id: group.id,
					verified: group.verified,
					name: group.name,
					description: group.description,
					topic: group.topic,
					moderator: group.moderatorId,
					meetings: group.meetings.map((thisGroupMeeting) =>
						allMeetings.filter((groupMeeting) =>
							groupMeeting.id.includes(thisGroupMeeting)
						)
					),
				})
			}),
		}

		res.send(user)
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { userId } = req.params
	const { alias, password, email } = req.body
	const createExpirationDate = () =>
		new Date(+new Date() + 24 * 60 * 60 * 1000)

	try {
		const user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		const hashPassword = await hashSomething(password)

		const newUser = await User.findOneAndUpdate(
			{ _id: userId },
			{
				...req.body,
				email: email.toLowerCase(),
				passwordHash: hashPassword,
			},
			{ returnOriginal: false }
		)

		if (newUser.email !== user.email) {
			const randomCode = Math.floor(
				1000 + Math.random() * 9000
			).toString()
			const hashCode = await hashSomething(randomCode)

			await User.updateOne(
				{ _id: userId },
				{
					emailVerified: false,
					authCode: hashCode,
					emailVerificationExpires: createExpirationDate(),
					refreshToken: '',
				}
			)

			res.locals.user = { alias, email }
			res.locals.authCode = randomCode
			console.log(res.locals)
			next()
		} else {
			res.send({ message: 'Benutzer erfolgreich aktualisiert' })
		}
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { userId } = req.params

	try {
		const user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		await Group.updateMany(
			{
				users: {
					$in: [userId],
				},
			},
			{
				$pull: {
					users: userId,
				},
			}
		)

		user.moderatedGroups.map(async (groupId) => {
			const specGroup = await Group.findOne({ _id: groupId })

			await deleteEvent(specGroup.meeting)

			await User.updateMany(
				{
					joinedGroups: {
						$in: [groupId],
					},
				},
				{
					$pull: {
						joinedGroups: groupId,
						meetings: specGroup.meeting,
					},
				}
			)

			await specGroup.delete()
		})

		await user.delete()

		res.send({ message: 'Benutzer erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
