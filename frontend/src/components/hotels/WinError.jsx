import React from "react";

export default function WinError({ children, onClose }) {
  return (
    <div className="win-error">
      <div className="error-message">
        {children}
        <button className="close-error-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}