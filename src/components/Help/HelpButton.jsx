import React from "react";
import { Info } from "lucide-react";
import "./Help.css";

const HelpButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="help-floating-button"
      onClick={onClick}
      aria-label="Open Help Center"
    >
      <div className="help-floating-icon">
        <Info size={22} strokeWidth={2.2} />
      </div>

      <span className="help-floating-text">
        Need Help
      </span>
    </button>
  );
};

export default HelpButton;