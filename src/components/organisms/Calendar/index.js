import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../../atoms/Header";
import EventsModal from "../../molecules/EventsModal";
import CustomEvent from "../../molecules/CustomEvent";
import useEventReminders from "../../../hooks/useEventReminders";
import "./styles.css";
import { useCalender } from "../../../hooks/useCalender";

const CalendarBody = () => {
  const {
    events,
    isEventsModalOpen,
    currentEvent,
    handleCreateNewEvent,
    handleDateSelect,
    handleEventClick,
    handleEventDrop,
    handleDeleteEvent,
    handleSaveEvent,
    closeEventsModal,
  } = useCalender();

  useEventReminders(events);

  return (
    <>
      <Header handleCreateNewEvent={handleCreateNewEvent} />
      <FullCalendar
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
        timeZone="local"
        eventContent={(eventInfo) => (
          <CustomEvent customEvent={eventInfo.event} />
        )}
        themeSystem="Cyborg"
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
