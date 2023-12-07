/* eslint-disable no-mixed-spaces-and-tabs */
const { User } = require('../models/User.model')
const { Group } = require('../models/Group.model')
const { Meeting } = require('../models/Meeting.model')

const myCustomError = require('../utils/myCustomError')
const {
	// getEvents,
	deleteEvent
} = require('../utils/googleCalendar')
const bcrypt = require('bcryptjs');
const {hashSomething} = require('./authControllers');


exports.find = async (req, res, next) => {
	const { userId } = req

	try {
		const user = await User.findOne(
			{ _id: userId },
			'alias email dob questions emailVerified gender'
		).populate({
			path: 'joinedGroups',
			select: 'name description topic img verified',
			populate: [{
				path: 'moderator',
				select: 'alias email',
			}, {
				path: 'meetings',
			}]
		}).populate({
			path: 'moderatedGroups',
			select: 'name description topic img verified',
			populate: {
				path: 'meetings'
			}
		})

		if (!user) throw myCustomError('User could not be found', 400)

		res.send(user)
	} catch (error) {
		next(error)
	}
}

exports.editPassword = async (req, res, next) => {
	const { userId } = req.params
	const { currentPassword, newPassword } = req.body

	try {
		const user = await User.findOne({ _id: userId }, '+passwordHash')
		if (!user) throw myCustomError('User could not be found', 400)

		const validPassword = await bcrypt.compare(currentPassword, user.passwordHash)
		if (!validPassword)
			throw myCustomError('Ungültiges Passwort', 401)

		user.passwordHash = await hashSomething(newPassword)

		await user.save()

		res.send({ message: 'Passwort erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.editEmail = async (req, res, next) => {
	const { userId } = req.params
	const { password, email: newEmail } = req.body

	try {
		const user = await User.findOne({ _id: userId }, '+passwordHash')
		if (!user) throw myCustomError('User could not be found', 400)

		const validPassword = await bcrypt.compare(password, user.passwordHash)
		if (!validPassword)
			throw myCustomError('Ungültige E-Mail oder Passwort', 401)

		user.email = newEmail

		await user.save()

		res.send({ message: 'Email erfolgreich aktualisiert' })
	} catch (error) {
		next(error)
	}
}

exports.edit = async (req, res, next) => {
	const { userId } = req.params

	try {
		const userUpdateInfo = await User.updateOne(
			{ _id: userId },
			req.body
		)

		if (!userUpdateInfo) throw myCustomError('User could not be updated', 400)

		res.send({ message: 'Benutzer erfolgreich aktualisiert' })
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

			for (let i = 0; i < specGroup.meetings.length; i++) {
				const meeting = await Meeting.findOneAndDelete({
					_id: specGroup.meetings[i],
				})
				await deleteEvent(meeting.calendarId)
				await User.updateMany(
					{
						meetings: {
							$in: [meeting.id],
						},
					},
					{
						$pull: {
							meetings: meeting.id,
						},
					}
				)
			}

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

		await user.delete()

		res.send({ message: 'Benutzer erfolgreich gelöscht' })
	} catch (error) {
		next(error)
	}
}
