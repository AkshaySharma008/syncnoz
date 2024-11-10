import React, { useState } from "react";
import "./styles.css";

const CustomCheckbox = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <label className="custom-checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="custom-checkbox-input"
      />
      <span className="custom-checkbox-box">
        {checked && <span className="custom-checkbox-checkmark">✓</span>}
      </span>
      {label}
    </label>
  );
};

export default CustomCheckbox;
