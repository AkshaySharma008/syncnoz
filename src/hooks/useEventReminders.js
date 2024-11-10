import { useEffect, useRef } from "react";

const useEventReminders = (events) => {
  const alertedEvents = useRef(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();

      events.forEach((event) => {
        const eventStartTime = new Date(event.start);
        const timeDifference = eventStartTime - currentTime;

        // Check if event starts in the next minute and if a reminder has not been shown
        if (
          event.extendedProps.reminder &&
          timeDifference > 0 &&
          timeDifference <= 60000 &&
          !alertedEvents.current.has(event.id)
        ) {
          alertedEvents.current.add(event.id);
          alert(`Reminder: ${event.title} is starting in 1 minute!`);
        }
      });
    }, 1000); // Check every second

    // Clear the interval on unmount
    return () => clearInterval(interval);
  }, [events]);
};

export default useEventReminders;
