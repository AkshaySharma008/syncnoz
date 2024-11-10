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
import EventsModal from "../molecules/EventsModal";

const CalendarBody = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState(() => {
    const storedEvents = getAllEventsFromLocalStorage();
    return storedEvents ? storedEvents : [];
  });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [showDatesInputs, setShowDatesInputs] = useState(false);

  const openEventsModal = () => setIsEventsModalOpen(true);
  const closeEventsModal = () => {
    setShowDatesInputs(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    const eventToAdd = {
      id: Date.now().toString(),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      allDay: true,
    };
    setEvents((prevEvents) => [...prevEvents, eventToAdd]);
    closeEventsModal();
    setNewEvent({ title: "", start: "", end: "" }); // Reset input fields
  };

  const handleEventClick = useCallback((clickInfo) => {
    const { id, title, start, end, allDay } = clickInfo.event;

    // Avoid passing complex event object directly
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

  const handleCreateNewEvent = () => {
    // const newEvent = {
    //   id: Date.now().toString(),
    //   title: "New Event",
    //   start: new Date(),
    //   allDay: true,
    // };
    // setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowDatesInputs(true);
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
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        longPressDelay={1}
        timeZone="UTC"
      />

      <EventsModal
        isOpen={isEventsModalOpen}
        onClose={closeEventsModal}
        currentEvent={currentEvent}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        handleDeleteEvent={handleDeleteEvent}
        handleSaveEvent={handleSaveEvent}
        showDatesInput={showDatesInputs}
        handleInputChange={handleInputChange}
        handleAddEvent={handleAddEvent}
        newEvent={newEvent}
      />
    </>
  );
};

export default CalendarBody;
