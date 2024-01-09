const getNextRecurrenceDate = (event, currentDate) => {
	if (event.recurrence.type === 'none') {
		return event.startDate;
	}

	let nextDate = new Date(event.startDate);
	const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

	// Calculate how many intervals have already passed since the start date
	if (nextDate < currentDate) {
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

module.exports = { getNextRecurrenceDate }