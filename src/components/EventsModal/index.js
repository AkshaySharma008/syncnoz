import React, { useState } from "react";
import "./styles.css";
import Modal from "../Modal";
import CustomCheckbox from "../CustomCheckbox";
import CustomSelect from "../CustomSelect";

const categories = ["Work", "Personal", "Fitness", "Shopping"];
const DefaultEventData = {
  title: "",
  id: "",
  start: "",
  end: "",
  reminder: false,
  category: "",
};

const EventsModal = ({
  isOpen,
  onClose,
  eventInfo,
  handleDeleteEvent,
  handleSaveEvent,
}) => {
  const [eventData, setEventData] = useState(DefaultEventData);

  const handleInputOnChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { start, end, title } = eventData;

    if (!title || !start || !end) {
      alert("Please fill in all fields!!!");
      return;
    }

    if (end < start) {
      alert("End time cannot be before start time!");
      return;
    }

    handleSaveEvent(eventData);
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16); // Returns YYYY-MM-DDTHH:MM format
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="events-modal-container">
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={(e) => handleInputOnChange(e.target.name, e.target.value)}
          placeholder="Add title"
          className="title"
        />
        <div className="date-picker-container">
          <div className="date-picker">
            <label className="date-label">Start Date:</label>
            <input
              type="datetime-local"
              name="start"
              value={formatDateForInput(eventData.start)}
              onChange={(e) =>
                handleInputOnChange(e.target.name, e.target.value)
              }
              className="date-input"
            />
          </div>
          <div className="date-picker">
            <label className="date-label">End Date:</label>
            <input
              type="datetime-local"
              name="end"
              value={formatDateForInput(eventData.end)}
              onChange={(e) =>
                handleInputOnChange(e.target.name, e.target.value)
              }
              className="date-input"
            />
          </div>
        </div>
        <CustomSelect
          options={categories}
          value={eventData.category}
          onChange={(value) => handleInputOnChange("category", value)}
          placeholder="Select a category"
        />
        <CustomCheckbox
          label="Remind Me"
          value={eventData.reminder}
          onChange={(value) => handleInputOnChange("reminder", value)}
        />
        <div className="modal-actions">
          {/* {currentEvent && currentEvent.title && (
            <button onClick={handleDeleteEvent}>Delete</button>
          )} */}
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventsModal;
