const { google } = require("googleapis");
require("dotenv").config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = "+01:00";

const dateTimeForCalender = (date, time, length) => {
  const newDateTime = `${date}T${time}:00.000${TIMEOFFSET}`;

  const startDate = new Date(Date.parse(newDateTime));

  const endDate = new Date(
    new Date(startDate).setMinutes(startDate.getMinutes() + (length / 10) * 10)
  );

  return {
    start: startDate,
    end: endDate,
  };
};

const insertEvent = async (event) => {
  try {
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return response.data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

const getEvents = async (dateTimeStart, dateTimeEnd) => {
  try {
    const response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
      timeZone: "Europe/Berlin",
      singleEvents: true,
    });

    const items = response.data.items;
    return items;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return 0;
  }
};

const getEvent = async (eventId) => {
  try {
    const response = await calendar.events.get({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
      singleEvents: true,
    });

    return response;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return 0;
  }
};

const editEvent = async (eventId, event) => {
  try {
    const response = await calendar.events.update({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
      resource: event,
    });

    if (response.status === 200 && response.statusText === "OK") {
      return response.data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at editEvents --> ${error}`);
    return 0;
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
    });

    if (response.data === "") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at deleteEvent --> ${error}`);
    return 0;
  }
};

module.exports = {
  deleteEvent,
  dateTimeForCalender,
  insertEvent,
  getEvents,
  getEvent,
  editEvent,
};
