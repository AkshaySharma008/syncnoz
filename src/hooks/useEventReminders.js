import { useEffect } from "react";

const useEventReminders = (events) => {
  const checkForReminders = () => {
    const now = new Date();
    events.forEach((event) => {
      const eventStart = new Date(event.start);
      const reminderTime = new Date(eventStart.getTime() - 1 * 60000); // 1 min before

      // If the reminder time is less than the current time, trigger the reminder
      if (now >= reminderTime && now <= eventStart) {
        if (event.extendedProps.reminder) {
          event.extendedProps.reminder = false; // Mark the reminder as triggered
          alert(`Reminder: Event "${event.title}" is starting soon!`); // Display reminder message
        }
      }
    });
  };

  // Set up a useEffect hook to check reminders every minute
  useEffect(() => {
    const reminderInterval = setInterval(checkForReminders, 1000); // Check every 30sec
    return () => clearInterval(reminderInterval); // Cleanup on component unmount
  }, [events]);
};

export default useEventReminders;
