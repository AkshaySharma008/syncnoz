import React from "react";
import "./styles.css";
import Modal from "../Modal";

const EventsModal = ({
  isOpen,
  onClose,
  currentEvent,
  eventTitle,
  setEventTitle,
  handleDeleteEvent,
  handleSaveEvent,
  setCurrentEvent,
}) => {
  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().slice(0, 16) : "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevEvent) => ({
      ...prevEvent,
      [name]: new Date(value).toISOString(),
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="events-modal-container">
        <input
          type="text"
          name="title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Add title"
          className="title"
        />
        <div className="date-picker-container">
          <div className="date-picker">
            <label className="date-label">Start Date:</label>
            <input
              type="datetime-local"
              name="start"
              value={formatDateForInput(currentEvent?.start)}
              onChange={handleInputChange}
              className="date-input"
            />
          </div>
          <div className="date-picker">
            <label className="date-label">End Date:</label>
            <input
              type="datetime-local"
              name="end"
              value={formatDateForInput(currentEvent?.end)}
              onChange={handleInputChange}
              className="date-input"
            />
          </div>
        </div>
        <div className="modal-actions">
          {currentEvent && currentEvent.title && (
            <button onClick={handleDeleteEvent}>Delete</button>
          )}
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSaveEvent} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventsModal;
