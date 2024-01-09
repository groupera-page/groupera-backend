const { getNextRecurrenceDate } = require('./meetingRecurrenceDate')

const getMultipleNextRecurrences = (event, count=5) => {
	let occurrences = [];
	let currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes() - event.duration)

	for (let i = 0; i < count; i++) {
		let nextDate = getNextRecurrenceDate(event, currentDate);

		if (!nextDate || (event.recurrence.until && nextDate > event.recurrence.until)) {
			break; // Stop if there's no next date, or it's beyond the recurrence end date
		}

		occurrences.push(nextDate);

		// Set the start date for the next iteration to be the day after the current next date
		currentDate = new Date(nextDate);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return occurrences;
};

exports.getNextDatesForMeetings = (events) => {
	const currentDate = new Date();

	return events.map(event => {
		if (event.recurrence.type === 'none' || !event.recurrence.until || event.recurrence.until >= currentDate) {
			// const nextDate = getNextRecurrenceDate(event, currentDate);
			const nextFiveRecurrences = getMultipleNextRecurrences(event, 5)
			return {
				...event, // Spread the original event data
				// nextDate: nextDate,
				nextRecurrences: nextFiveRecurrences,
			};
		}
		return null; // Filter out events that are past their recurrence end date
	}).filter(event => event !== null); // Remove null entries
};

exports.findNextUpcomingMeeting = (eventsWithNextRecurrences) => {
	if (!eventsWithNextRecurrences || eventsWithNextRecurrences.length === 0) {
		return null; // Return null if the array is empty or not provided
	}

	// Sort the array by the nextDate in ascending order
	const sortedEvents = eventsWithNextRecurrences
		.map(m => {
			return m.nextRecurrences.map(r => {
				delete m.nextRecurrences
				return {
					...m,
					startDate: r
				}
			})
		})
		.flat()
		.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))

	// Return the first element in the sorted array
	return sortedEvents[0];
};

// module.exports = { getNextRecurrenceDate };