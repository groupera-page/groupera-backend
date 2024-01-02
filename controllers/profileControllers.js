/* eslint-disable no-mixed-spaces-and-tabs */
const { User } = require('../models/User.model')
const { Group } = require('../models/Group.model')
const { Meeting } = require('../models/Meeting.model')

const myCustomError = require('../utils/myCustomError')
// const {
// 	// getEvents,
// 	// deleteEvent
// } = require('../utils/googleCalendar')
const bcrypt = require('bcryptjs')
const { hashSomething } = require('./authControllers')
const {
	getNextDatesForMeetings,
	findNextUpcomingMeeting,
} = require('../utils/meetingRecurrence.helpers')

exports.find = async (req, res, next) => {
	const { userId } = req

	try {
		let user = await User.findOne(
			{ _id: userId },
			'alias email dob questions emailVerified gender role'
		)
			.populate({
				path: 'joinedGroups',
				select: 'name description topic img verified',
				match: { verified: true },
				populate: [
					{
						path: 'moderator',
						select: 'alias email',
					},
					{
						path: 'meetings',
					},
				],
			})
			.populate({
				path: 'moderatedGroups',
				select: 'name description topic img verified',
				populate: {
					path: 'meetings',
				},
			})

		if (!user) throw myCustomError('User could not be found', 400)

		user = user.toJSON()

		user.joinedGroups = user.joinedGroups.map((group) => ({
			...group,
			meetings: getNextDatesForMeetings(group.meetings),
		}))
		user.moderatedGroups = user.moderatedGroups.map((group) => ({
			...group,
			meetings: getNextDatesForMeetings(group.meetings),
		}))

		const nextMeeting = findNextUpcomingMeeting([
			...user.moderatedGroups.map((g) => g.meetings).flat(),
			...user.joinedGroups.map((g) => g.meetings).flat(),
		])

		if (nextMeeting) {
			user.nextMeeting = {
				meeting: nextMeeting,
				group: [...user.joinedGroups, ...user.moderatedGroups].find(
					(g) => g.meetings.some((m) => m.id === nextMeeting.id)
				),
			}
		}

		res.send(user)
	} catch (error) {
		next(error)
	}
}

exports.editPassword = async (req, res, next) => {
	const { userId } = req
	const { currentPassword, newPassword } = req.body

	try {
		const user = await User.findOne({ _id: userId }, '+passwordHash')
		if (!user) throw myCustomError('User could not be found', 400)

		const validPassword = await bcrypt.compare(
			currentPassword,
			user.passwordHash
		)
		if (!validPassword) throw myCustomError('Ungültiges Passwort', 403)

		user.passwordHash = await hashSomething(newPassword)

		await user.save()

		res.send({ message: 'Passwort erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.editEmail = async (req, res, next) => {
	const { userId } = req
	const { password, email: newEmail } = req.body

	try {
		const user = await User.findOne({ _id: userId }, '+passwordHash')
		if (!user) throw myCustomError('User could not be found', 400)

		const validPassword = await bcrypt.compare(password, user.passwordHash)
		if (!validPassword)
			throw myCustomError('Ungültige E-Mail oder Passwort', 403)

		user.email = newEmail

		await user.save()

		res.send({ message: 'Email erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { userId, body } = req

	try {
		const { acknowledged } = await User.updateOne({ _id: userId }, body)

		if (!acknowledged) throw myCustomError('User could not be updated', 400)

		res.send({ message: 'Benutzer erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.delete = async (req, res, next) => {
	const { userId } = req

	try {
		const user = await User.findOne({ _id: userId })
		if (!user) throw myCustomError('User could not be found', 400)

		await Group.updateMany(
			{
				members: {
					$in: [userId],
				},
			},
			{
				$pull: {
					members: userId,
				},
			}
		)

		user.moderatedGroups.map(async (groupId) => {
			const specGroup = await Group.findOne({ _id: groupId })

			await Meeting.deleteMany({
				group: groupId,
			})

			await User.updateMany(
				{
					joinedGroups: {
						$in: [groupId],
					},
				},
				{
					$pull: {
						joinedGroups: groupId,
					},
				}
			)

			await specGroup.delete()
		})

		res.locals.user = user

		await user.delete()

		if (process.env.NODE_ENV === 'development') {
			res.send({ message: 'Benutzer erfolgreich gelöscht' })
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
}
