const {User} = require('../models/User.model');

exports.findAll = async (req, res, next) => {
	try {
		// Set up pagination variables
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		// Set up filters for group name or topic
		const filter = {
			verified: true
		};

		if (req.query.name) {
			filter.name = new RegExp(req.query.name, 'i'); // Case-insensitive match
		}
		if (req.query.topic) {
			filter.topic = new RegExp(req.query.topic, 'i'); // Case-insensitive match
		}

		const users = await User
			.find(filter, 'alias email dob questions gender')
			.populate({
				path: 'joinedGroups',
				select: 'name description topic img verified',
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
			.sort([['createdAt', -1]])
			.skip(skip)
			.limit(limit)

		// get the total count for pagination info
		const totalCount = await User.countDocuments();

		res.status(200).send({users, totalCount})
	} catch (error) {
		next(error)
	}
}


// /* eslint-disable no-mixed-spaces-and-tabs */
// const { User } = require('../models/User.model')
// const { Group } = require('../models/Group.model')
// const { Meeting } = require('../models/Meeting.model')

// const myCustomError = require('../utils/myCustomError')
// const {
// 	// getEvents,
// 	deleteEvent
// } = require('../utils/googleCalendar')


// exports.findOne = async (req, res, next) => {
// 	const { userId } = req.params

// 	try {
// 		let user = await User.findOne(
// 			{ _id: userId },
// 			'alias email dob questions emailVerified gender'
// 		).populate({
// 			path: 'joinedGroups',
// 			select: 'name description topic img verified',
// 			populate: [{
// 				path: 'moderator',
// 				select: 'alias email',
// 			}, {
// 				path: 'meetings',
// 			}]
// 		}).populate({
// 			path: 'moderatedGroups',
// 			select: 'name description topic img verified',
// 			populate: {
// 				path: 'meetings'
// 			}
// 		})

// 		if (!user) throw myCustomError('User could not be found', 400)

// 		res.send(user)
// 	} catch (error) {
// 		next(error)
// 	}
// }

// // exports.edit = async (req, res, next) => {
// // 	const { userId } = req.params
// // 	const { alias, password, email } = req.body
// // 	const createExpirationDate = () =>
// // 		new Date(+new Date() + 24 * 60 * 60 * 1000)
// //
// // 	try {
// // 		const user = await User.findOne({ _id: userId })
// // 		if (!user) throw myCustomError('User could not be found', 400)
// //
// // 		const hashPassword = await hashSomething(password)
// //
// // 		const newUser = await User.findOneAndUpdate(
// // 			{ _id: userId },
// // 			{
// // 				...req.body,
// // 				email: email.toLowerCase(),
// // 				passwordHash: hashPassword,
// // 			},
// // 			{ returnOriginal: false }
// // 		)
// //
// // 		if (newUser.email !== user.email) {
// // 			const randomCode = Math.floor(
// // 				1000 + Math.random() * 9000
// // 			).toString()
// // 			const hashCode = await hashSomething(randomCode)
// //
// // 			await User.updateOne(
// // 				{ _id: userId },
// // 				{
// // 					emailVerified: false,
// // 					authCode: hashCode,
// // 					emailVerificationExpires: createExpirationDate(),
// // 					refreshToken: '',
// // 				}
// // 			)
// //
// // 			res.locals.user = { alias, email }
// // 			res.locals.authCode = randomCode
// // 			console.log(res.locals)
// // 			next()
// // 		} else {
// // 			res.send({ message: 'Benutzer erfolgreich aktualisiert' })
// // 		}
// // 	} catch (error) {
// // 		next(error)
// // 	}
// // }

// exports.edit = async (req, res, next) => {
// 	const { userId } = req.params

// 	try {
// 		const userUpdateInfo = await User.updateOne(
// 			{ _id: userId },
// 			req.body
// 		)

// 		if (!userUpdateInfo) throw myCustomError('User could not be updated', 400)

// 		res.send({ message: 'Benutzer erfolgreich aktualisiert' })
// 	} catch (error) {
// 		next(error)
// 	}
// }

// exports.delete = async (req, res, next) => {
// 	const { userId } = req.params

// 	try {
// 		const user = await User.findOne({ _id: userId })
// 		if (!user) throw myCustomError('User could not be found', 400)

// 		await Group.updateMany(
// 			{
// 				users: {
// 					$in: [userId],
// 				},
// 			},
// 			{
// 				$pull: {
// 					users: userId,
// 				},
// 			}
// 		)

// 		await Meeting.updateMany({
// 			members: {
// 				$in: [userId],
// 			},
// 		},
// 		{
// 			$pull: {
// 				members: userId,
// 			},
// 		})

// 		user.moderatedGroups.map(async (groupId) => {
// 			const specGroup = await Group.findOne({ _id: groupId })

// 			for (let i = 0; i < specGroup.meetings.length; i++) {
// 				const meeting = await Meeting.findOneAndDelete({
// 					_id: specGroup.meetings[i],
// 				})
// 				await deleteEvent(meeting.calendarId)
// 				await User.updateMany(
// 					{
// 						meetings: {
// 							$in: [meeting.id],
// 						},
// 					},
// 					{
// 						$pull: {
// 							meetings: meeting.id,
// 						},
// 					}
// 				)
// 			}

// 			await User.updateMany(
// 				{
// 					joinedGroups: {
// 						$in: [groupId],
// 					},
// 				},
// 				{
// 					$pull: {
// 						joinedGroups: groupId,
// 					},
// 				}
// 			)

// 			await specGroup.delete()
// 		})

// 		res.locals.user = user

// 		await user.delete()

// 		next()
// 	} catch (error) {
// 		next(error)
// 	}
// }

