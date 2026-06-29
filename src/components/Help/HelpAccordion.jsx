import React from "react";
import { ChevronDown } from "lucide-react";
import "./Help.css";

const HelpAccordion = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="help-accordion">
      <button
        type="button"
        className="help-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="help-question">
          {question}
        </span>

        <ChevronDown
          size={18}
          className={`help-chevron ${
            isOpen ? "rotate" : ""
          }`}
        />
      </button>

      <div
        className={`help-accordion-content ${
          isOpen ? "show" : ""
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default HelpAccordion;