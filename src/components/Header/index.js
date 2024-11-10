import React from "react";
import "./styles.css";

const Header = () => {
  return (
    <div className="header-container">
      <h2 className="header-logo">SyncNoz</h2>
      <button className="create-event-button">Create new event</button>
    </div>
  );
};

export default Header;
