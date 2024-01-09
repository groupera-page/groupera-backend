require('dotenv').config()
const express = require('express')
// const schedule = require('node-schedule')
require('./db')

const { noPathError, defaultError } = require('./error-handling')
const { meetingScheduler } = require('./utils/meeting.scheduler')

const mainRoutes = require('./routes')

const app = express()

app.use(express.json({ limit: '50mb' }))

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

meetingScheduler

// handle routes
app.use(mainRoutes)
// ❗ To handle Routes that don't exist
app.use(noPathError)
// ❗ To handle errors that you handle in specific routes
app.use(defaultError)

// ℹ️ Sets the PORT for our app to have access to it. Defaults to 3000
const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`)
})
