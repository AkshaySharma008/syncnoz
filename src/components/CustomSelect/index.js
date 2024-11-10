import React, { useState } from "react";
import "./styles.css";

const CustomSelect = ({
  value,
  options,
  onChange,
  placeholder = "Select a category",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <div className="custom-select" onClick={handleToggleDropdown}>
        <span className="custom-select-selected">{value || placeholder}</span>
        <span className="custom-select-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="custom-select-dropdown">
          {options.map((option, index) => (
            <li
              key={index}
              className="custom-select-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
