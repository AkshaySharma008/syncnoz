// src/Calendar.js

import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const LOCAL_STORAGE_KEY = "syncNozEvents";

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    // Load events from localStorage during initial render
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Save events to localStorage whenever `events` state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // Handle event creation when a date is selected
  const handleDateSelect = useCallback((selectInfo) => {
    const title = prompt("Please enter a title for your event");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Clear the selection

    if (title) {
      const newEvent = {
        id: `${selectInfo.startStr}-${selectInfo.endStr}`,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }, []);

  // Handle event deletion on click
  const handleEventClick = useCallback((clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  }, []);

  return (
    <div className="App">
      <h2>SyncNoz Event Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
