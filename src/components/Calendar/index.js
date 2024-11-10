import React, { useState, useEffect, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./styles.css";
import {
  saveEventsToLocalStorage,
  getAllEventsFromLocalStorage,
} from "../../utils/localStorage.utils";
import Header from "../Header";
import EventsModal from "../EventsModal";

const CalendarBody = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState(() => {
    const storedEvents = getAllEventsFromLocalStorage();
    return storedEvents ? storedEvents : [];
  });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  const openEventsModal = () => setIsEventsModalOpen(true);

  const closeEventsModal = () => {
    setIsEventsModalOpen(false);
  };

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
    openEventsModal();
  }, []);

  const handleEventClick = useCallback((clickInfo) => {
    const { id, title, start, end, allDay } = clickInfo.event;

    setCurrentEvent({
      id,
      start,
      end,
      allDay,
    });
    setEventTitle(title);
    openEventsModal();
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

    closeEventsModal();
  };

  const handleDeleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== currentEvent.id)
    );
    closeEventsModal();
  };

  // Handle event drop (drag and drop)
  const handleEventDrop = (eventDropInfo) => {
    const { event } = eventDropInfo;

    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === event.id
          ? {
              ...evt,
              start: event.start,
              end: event.end,
            }
          : evt
      )
    );
  };

  const handleCreateNewEvent = () => {
    setCurrentEvent(null);
    setEventTitle("");
    openEventsModal();
  };

  return (
    <>
      <Header handleCreateNewEvent={handleCreateNewEvent} />
      <FullCalendar
        ref={calendarRef}
        headerToolbar={{
          left: "prevYear,prev,next,nextYear today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        longPressDelay={1}
        timeZone="ISO"
        eventDrop={handleEventDrop}
        displayEventTime={true}
      />

      <EventsModal
        isOpen={isEventsModalOpen}
        onClose={closeEventsModal}
        currentEvent={currentEvent}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        handleDeleteEvent={handleDeleteEvent}
        handleSaveEvent={handleSaveEvent}
        setCurrentEvent={setCurrentEvent}
      />
    </>
  );
};

export default CalendarBody;
