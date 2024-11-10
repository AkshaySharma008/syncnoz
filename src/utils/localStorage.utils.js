const LOCAL_STORAGE_KEY = "syncNozEvents";

export const saveEventsToLocalStorage = (events) => {
  // Extract only serializable properties of each event
  const eventsToStore = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
  }));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(eventsToStore));
};

export const getAllEventsFromLocalStorage = () => {
  const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedEvents ? JSON.parse(storedEvents) : [];
};
