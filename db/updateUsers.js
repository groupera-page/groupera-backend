require('dotenv').config();
require('./index')
const {User} = require('../models/User.model');

const updateUsers = async () => {
	await User.updateMany({}, {
		role: 'user'
	})

	console.log('Role added to each user! 🌱');
}

updateUsers().then(() => process.exit());
