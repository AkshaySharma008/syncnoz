import React from "react";
import CalendarBody from "../../components/Calendar";
import Header from "../../components/Header";
import "./styles.css";

const Calendar = () => {
  return (
    <div className="calendar-container">
      <Header />
      <CalendarBody />
    </div>
  );
};

export default Calendar;
