import React from "react";
import "./styles.css";

const Header = ({ handleCreateNewEvent }) => {
  return (
    <div className="header-container">
      <h2 className="header-logo">SyncNoz</h2>
      <button className="create-event-button" onClick={handleCreateNewEvent}>
        Create new event
      </button>
    </div>
  );
};

export default Header;
