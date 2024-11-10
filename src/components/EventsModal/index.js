import React from "react";
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
      <>
        <h3>
          {currentEvent && currentEvent.title ? "Edit Event" : "Add Event"}
        </h3>
        <input
          type="text"
          name="title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
        />
        <div className="modal-actions">
          <button onClick={handleSaveEvent}>Save</button>
          {currentEvent && currentEvent.title && (
            <button onClick={handleDeleteEvent}>Delete</button>
          )}
          <button onClick={onClose}>Cancel</button>
        </div>
      </>
    </Modal>
  );
};

export default EventsModal;
