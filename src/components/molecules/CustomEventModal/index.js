import React from "react";
import Modal from "../../atoms/Modal";

const CustomEventModal = ({
  isModalOpen,
  closeModal,
  handleInputChange,
  newEvent,
  handleAddEvent,
}) => {
  return (
    <Modal onClose={closeModal} isOpen={isModalOpen}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Event</h2>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
            />
          </div>
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
          <button type="button" onClick={handleAddEvent}>
            Add Event
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CustomEventModal;
