import React from "react";
import CalendarBody from "../../organisms/Calendar";
import "./styles.css";
import Footer from "../../atoms/Footer";

const Calendar = () => {
  return (
    <div className="calendar-container">
      <CalendarBody />
      <Footer />
    </div>
  );
};

export default Calendar;
