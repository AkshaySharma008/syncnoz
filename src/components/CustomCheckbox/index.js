import React from "react";
import "./styles.css";

const CustomCheckbox = ({ label, onChange, value }) => {
  return (
    <label className="custom-checkbox-label">
      <input
        type="checkbox"
        checked={value || false}
        onChange={(e) => onChange(e.target.checked)}
        className="custom-checkbox-input"
      />
      <span className="custom-checkbox-box">
        {value && <span className="custom-checkbox-checkmark">✓</span>}
      </span>
      {label}
    </label>
  );
};

export default CustomCheckbox;
