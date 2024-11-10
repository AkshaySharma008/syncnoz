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
}) => {
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
