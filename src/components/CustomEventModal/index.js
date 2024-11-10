import React from "react";
import Modal from "../Modal";

const CustomEventsModal = ({
  isOpen,
  onClose,
  newEvent,
  handleInputChange,
  handleAddEvent,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <h3>Add Event</h3>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Enter event title"
        />
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
        <div className="modal-actions">
          <button onClick={handleAddEvent}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </>
    </Modal>
  );
};

export default CustomEventsModal;
