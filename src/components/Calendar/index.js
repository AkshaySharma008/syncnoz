import React, { useState, useEffect, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./styles.css";
import CalenderModal from "../molecules/CalenderModal";
import {
  saveEventsToLocalStorage,
  getAllEventsFromLocalStorage,
} from "../../utils/localStorage.utils";
import Header from "../Header";
import CustomEventModal from "../molecules/CustomEventModal";

const CalendarBody = () => {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState(() => {
    const storedEvents = getAllEventsFromLocalStorage();
    return storedEvents ? storedEvents : [];
  });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const openCalenderModal = () => setIsCalenderOpen(true);
  const closeCalendarModal = () => setIsCalenderOpen(false);
  const openCustomModal = () => setIsCustomModalOpen(true);
  const closeCustomModal = () => setIsCustomModalOpen(false);

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
    openCalenderModal();
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
    closeCalendarModal();
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
    openCalenderModal();
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

    closeCalendarModal();
  };

  const handleDeleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== currentEvent.id)
    );
    closeCalendarModal();
  };

  const handleCreateNewEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      title: "New Event",
      start: new Date(),
      allDay: true,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  console.log(isCalenderOpen, isCustomModalOpen);

  return (
    <>
      <Header handleCreateNewEvent={openCustomModal} />
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

      {/* Modal for Add/Edit Event on calender click */}
      <CalenderModal
        isModalOpen={isCalenderOpen}
        currentEvent={currentEvent}
        eventTitle={eventTitle}
        handleSaveEvent={handleSaveEvent}
        handleDeleteEvent={handleDeleteEvent}
        closeModal={closeCalendarModal}
        setEventTitle={setEventTitle}
      />

      {/* Modal for Add Event from nav button */}
      <CustomEventModal
        isModalOpen={isCustomModalOpen}
        closeModal={closeCustomModal}
        handleInputChange={handleInputChange}
        newEvent={newEvent}
        handleAddEvent={handleAddEvent}
      />
    </>
  );
};

export default CalendarBody;
