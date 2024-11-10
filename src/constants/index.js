export const EVENT_CATEGORIES = ["Event", "Appointment", "Task", "Reminder"];

export const LOCAL_STORAGE_KEY = "syncNozEvents";

export const DEFAULT_EVENT_DATA = {
  title: "",
  id: "",
  start: "",
  end: "",
  extendedProps: {
    reminder: false,
    category: "",
  },
};
