import { useState, useEffect, useCallback } from "react";

import {
  saveEventsToLocalStorage,
  getAllEventsFromLocalStorage,
} from "../utils/localStorage.utils";

export const useCalender = () => {
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
    const { id, startStr, endStr, allDay, title } = clickInfo.event;

    setCurrentEvent({
      id,
      start: startStr,
      end: endStr,
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
    const { start, end, title } = eventData;

    if (!title || !start || !end) {
      alert("Please fill in all fields!!!");
      return;
    }

    if (end < start) {
      alert("End time cannot be before start time!");
      return;
    }

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

  return {
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
  };
};
