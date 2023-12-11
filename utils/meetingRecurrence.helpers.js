const getNextRecurrenceDate = (event, currentDate) => {
	if (event.recurrence.type === 'none') {
		return event.startDate;
	}

	let nextDate = new Date(event.startDate);
	const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

	// Check for weekly and bi-weekly events
	if (event.recurrence.type === 'weekly' || event.recurrence.type === 'bi-weekly') {
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

exports.getNextDatesForMeetings = (events) => {
	const currentDate = new Date();

	return events.map(event => {
		if (event.recurrence.type === 'none' || !event.recurrence.until || event.recurrence.until >= currentDate) {
			const nextDate = getNextRecurrenceDate(event, currentDate);
			return {
				...event, // Spread the original event data
				nextDate: nextDate // Add the nextDate property
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