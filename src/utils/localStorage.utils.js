const LOCAL_STORAGE_KEY = "syncNozEvents";

export const saveEventsToLocalStorage = (events) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
};

export const getAllEventsFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
};
