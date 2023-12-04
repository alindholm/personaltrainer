import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';



export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  useEffect(() => {
    const rest_url = 'https://traineeapp.azurewebsites.net/gettrainings';

    fetch(rest_url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Raw data from API:', responseData);
        const formattedEvents = responseData.map((training) => ({
          title: `${training.activity} , ${training.customer.firstname} ${training.customer.lastname}`,
          start: new Date(training.date),
          end: moment(training.date).add(training.duration, 'minutes').toDate(),
        }));
        console.log('Formatted events for the calendar:', formattedEvents);
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching training events:', error);
      });
  }, []);

  return (
    <div style={{ height: '700px', padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week', 'month', 'day']}
        step={60}
        showMultiDayTimes

      />
    </div>

  );
}
