export const getEventsBackgroundColor = (category) => {
  let color = "lightblue";
  switch (category) {
    case "Appointment":
      color = "lightgreen";
      break;
    case "Task":
      color = "lightcoral";
      break;
    case "Reminder":
      color = "lightcyan";
      break;
    default:
      color = "lightblue";
      break;
  }

  return color;
};
