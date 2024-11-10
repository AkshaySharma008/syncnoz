import React from "react";
import Modal from "../../atoms/Modal";

const EventsModal = ({
  isOpen,
  onClose,
  currentEvent,
  eventTitle,
  setEventTitle,
  handleDeleteEvent,
  handleSaveEvent,
  showDatesInput,
  newEvent,
  handleInputChange,
  handleAddEvent,
}) => {
  const handleSave = () => {
    if (showDatesInput) handleAddEvent();
    else handleSaveEvent();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <h3>
          {currentEvent && currentEvent.title ? "Edit Event" : "Add Event"}
        </h3>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={(e) => {
            handleInputChange(e);
            setEventTitle(e.target.value);
          }}
          placeholder="Enter event title"
        />
        {showDatesInput && (
          <div>
            <div>
              <label>Start Date:</label>
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
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
