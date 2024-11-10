import React, { useEffect, useState } from "react";
import "./styles.css";
import Modal from "../Modal";
import CustomCheckbox from "../CustomCheckbox";
import CustomSelect from "../CustomSelect";
import { EVENT_CATEGORIES } from "../../constants";
import { formatToISOWithMidnightOffset } from "../../utils/dateFormat.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_EVENT_DATA } from "../../constants";

const EventsModal = ({
  isOpen,
  onClose,
  eventInfo,
  handleDeleteEvent,
  handleSaveEvent,
}) => {
  const [eventData, setEventData] = useState(DEFAULT_EVENT_DATA);

  useEffect(() => {
    if (eventInfo) {
      if (eventInfo.allDay) {
        setEventData({
          ...eventInfo,
          start: formatToISOWithMidnightOffset(eventInfo.start),
          end: formatToISOWithMidnightOffset(eventInfo.start, true),
        });
      } else {
        setEventData(eventInfo);
      }
    }
  }, [eventInfo]);

  const handleInputOnChange = (name, value) => {
    setEventData((prevData) => {
      const updatedData = { ...prevData };
      const keys = name.split(".");

      // Use reduce to traverse and update nested properties
      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value; // Set the final property to the value
        } else {
          if (!acc[key]) acc[key] = {}; // Ensure intermediate object exists
        }
        return acc[key];
      }, updatedData);

      return updatedData;
    });
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
    return date.slice(0, 16);
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
          options={EVENT_CATEGORIES}
          value={eventData.extendedProps.category}
          onChange={(value) =>
            handleInputOnChange("extendedProps.category", value)
          }
          placeholder="Select a category"
        />
        <CustomCheckbox
          label="Remind Me"
          value={eventData.extendedProps.reminder}
          onChange={(value) =>
            handleInputOnChange("extendedProps.reminder", value)
          }
        />
        <div className="modal-actions">
          {eventData && eventData.id && (
            <button onClick={handleDeleteEvent} className="btn btn-warning">
              <FontAwesomeIcon icon={faTrashAlt} size="sm" color="red" /> Delete
            </button>
          )}

          <div className="modal-right-action">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventsModal;
