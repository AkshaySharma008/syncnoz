import React from "react";
import Modal from "../Modal";
import "./styles.css";

const CustomEventsModal = ({
  isOpen,
  onClose,
  newEvent,
  handleInputChange,
  handleAddEvent,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="events-modal-container">
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Add title"
          className="title"
        />

        <div className="date-picker-container">
          <div className="date-picker">
            <label className="date-label">Start Date:</label>
            <input
              type="datetime-local"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              className="date-input"
            />
          </div>
          <div className="date-picker">
            <label className="date-label">End Date:</label>
            <input
              type="datetime-local"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              className="date-input"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleAddEvent} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomEventsModal;
