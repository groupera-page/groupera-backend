const getNextRecurrenceDate = (event, currentDate) => {
	if (event.recurrence.type === 'none') {
		return event.startDate;
	}

	let nextDate = new Date(event.startDate);
	const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

	// Calculate how many intervals have already passed since the start date
	if (['weekly', 'bi-weekly', 'monthly', 'yearly'].includes(event.recurrence.type)) {
		let intervalDays = 0;
		switch (event.recurrence.type) {
			case 'weekly':
				intervalDays = 7;
				break;
			case 'bi-weekly':
				intervalDays = 14;
				break;
			case 'monthly':
				intervalDays = 30; // Approximation, actual days will vary
				break;
			case 'yearly':
				intervalDays = 365; // Not accounting for leap years
				break;
		}

		const intervalsPassed = Math.floor((currentDate - nextDate) / (intervalDays * 24 * 60 * 60 * 1000));

		// Setting next Date to the last recurrence
		switch (event.recurrence.type) {
			case 'weekly':
			case 'bi-weekly':
				nextDate = addDays(nextDate, intervalsPassed * intervalDays)
				break;
			case 'monthly':
				nextDate.setMonth(nextDate.getMonth() + intervalsPassed);
				break;
			case 'yearly':
				nextDate.setFullYear(nextDate.getFullYear() + intervalsPassed);
				break;
		}
	}

	// Check for weekly and bi-weekly events
	if (['weekly', 'bi-weekly'].includes(event.recurrence.type)) {
		const weekDays = event.recurrence.days.sort();
		const interval = event.recurrence.type === 'bi-weekly' ? 14 : 7;

		// Find the next occurrence day
		while (nextDate < currentDate || !weekDays.includes(nextDate.getDay())) {
			nextDate = addDays(nextDate, 1);
			// Reset to next week/bi-weekly interval if we've passed the last day of the current week/bi-weekly period
			if (nextDate.getDay() === weekDays[0]) {
				nextDate = addDays(nextDate, interval - 7);
			}
		}
	} else {
		// For monthly and yearly
		while (nextDate < currentDate) {
			switch (event.recurrence.type) {
				case 'monthly':
					nextDate.setMonth(nextDate.getMonth() + 1);
					break;
				case 'yearly':
					nextDate.setFullYear(nextDate.getFullYear() + 1);
					break;
			}
		}
	}

	return (event.recurrence.until && nextDate > event.recurrence.until) ? null : nextDate;
};

const getMultipleNextRecurrences = (event, count=5) => {
	let occurrences = [];
	let currentDate = new Date();

	for (let i = 0; i < count; i++) {
		let nextDate = getNextRecurrenceDate(event, currentDate);

		if (!nextDate || (event.recurrence.until && nextDate > event.recurrence.until)) {
			break; // Stop if there's no next date or it's beyond the recurrence end date
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

exports.findNextUpcomingMeeting = (eventsWithNextDate) => {
	if (!eventsWithNextDate || eventsWithNextDate.length === 0) {
		return null; // Return null if the array is empty or not provided
	}

	// Sort the array by the nextDate in ascending order
	const sortedEvents = eventsWithNextDate.sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate));

	// Return the first element in the sorted array
	return sortedEvents[0];
};