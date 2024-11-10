import React from "react";
import "./styles.css";
import { getEventsBackgroundColor } from "../../../utils/eventColor.utils";

const CustomEvent = ({ customEvent }) => {
  const { title } = customEvent;
  const { category } = customEvent.extendedProps;
  return (
    <div
      style={{
        backgroundColor: getEventsBackgroundColor(category),
        width: "100%",
        height: "100%",
      }}
    >
      <strong className="event-title">{title}</strong>
    </div>
  );
};

export default CustomEvent;
