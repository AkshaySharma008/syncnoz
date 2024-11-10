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
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    const storedEvents = getAllEventsFromLocalStorage();
    return storedEvents ? storedEvents : [];
  });

  const openEventsModal = () => setIsEventsModalOpen(true);
  const closeEventsModal = () => setIsEventsModalOpen(false);

  useEffect(() => {
    saveEventsToLocalStorage(events);
  }, [events]);

  const handleDateSelect = useCallback((selectInfo) => {
    setCurrentEvent({
      id: `${selectInfo.startStr}-${selectInfo.endStr}`,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      extendedProps: {
        reminder: false,
        category: "",
      },
    });
    openEventsModal();
  }, []);

  const handleEventClick = useCallback((clickInfo) => {
    const { reminder, category } = clickInfo.event.extendedProps;

    const { id, start, end, allDay, title } = clickInfo.event;

    setCurrentEvent({
      id,
      start,
      end,
      allDay,
      title,
      extendedProps: {
        reminder,
        category,
      },
    });
    openEventsModal();
  }, []);

  const handleSaveEvent = (eventData) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(
        (event) => event.id !== eventData.id
      );
      return [...updatedEvents, eventData];
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
        eventDrop={handleEventDrop}
        displayEventTime={true}
      />

      <EventsModal
        isOpen={isEventsModalOpen}
        onClose={closeEventsModal}
        eventInfo={currentEvent}
        handleDeleteEvent={handleDeleteEvent}
        handleSaveEvent={handleSaveEvent}
      />
    </>
  );
};

export default CalendarBody;
