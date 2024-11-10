import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./styles.css";
import EventModal from "../EventModal";
import {
  saveEventsToLocalStorage,
  getAllEventsFromLocalStorage,
} from "../../utils/localStorage.utils";

const Calendar = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = getAllEventsFromLocalStorage();
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");

  useEffect(() => {
    saveEventsToLocalStorage(events);
  }, [events]);

  const handleDateSelect = useCallback((selectInfo) => {
    setCurrentEvent({
      id: `${selectInfo.startStr}-${selectInfo.endStr}`,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
    setEventTitle("");
    setIsModalOpen(true); // Show the modal
  }, []);

  const handleEventClick = useCallback((clickInfo) => {
    setCurrentEvent(clickInfo.event);
    setEventTitle(clickInfo.event.title);
    setIsModalOpen(true); // Show the modal
  }, []);

  const handleSaveEvent = () => {
    if (eventTitle.trim() === "") return;

    const newEvent = {
      ...currentEvent,
      title: eventTitle,
    };

    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(
        (event) => event.id !== currentEvent.id
      );
      return [...updatedEvents, newEvent];
    });

    setIsModalOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== currentEvent.id)
    );
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      {/* Modal for Add/Edit Event */}
      <EventModal
        isModalOpen={isModalOpen}
        currentEvent={currentEvent}
        eventTitle={eventTitle}
        handleSaveEvent={handleSaveEvent}
        handleDeleteEvent={handleDeleteEvent}
        closeModal={closeModal}
        setEventTitle={setEventTitle}
      />
    </div>
  );
};

export default Calendar;
