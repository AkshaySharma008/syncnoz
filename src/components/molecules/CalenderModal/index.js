import React from "react";
import Modal from "../../atoms/Modal";

const CalenderModal = ({
  isModalOpen,
  currentEvent,
  eventTitle,
  handleSaveEvent,
  handleDeleteEvent,
  closeModal,
  setEventTitle,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <>
        <h3>
          {currentEvent && currentEvent.title ? "Edit Event" : "Add Event"}
        </h3>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
        />
        <div className="modal-actions">
          <button onClick={handleSaveEvent}>Save</button>
          {currentEvent && currentEvent.title && (
            <button onClick={handleDeleteEvent}>Delete</button>
          )}
          <button onClick={closeModal}>Cancel</button>
        </div>
      </>
    </Modal>
  );
};

export default CalenderModal;
