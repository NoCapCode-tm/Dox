import React, { useEffect, useState } from "react";
import { X, Mail, BookOpen } from "lucide-react";
import HelpAccordion from "./HelpAccordion";
import { helpContent } from "./helpContent";
import "./Help.css";

const HelpDrawer = ({
  open,
  onClose,
  page = "dashboard",
}) => {
  const content = helpContent[page] || helpContent.dashboard;
  const [openIndex, setOpenIndex] = useState(0);


  // Close with ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`help-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`help-drawer ${open ? "open" : ""}`}
      >
        {/* Header */}
        <div className="help-header">
          <div>
            <h2>Need Help?</h2>
            <p>{content.title}</p>
          </div>

          <button
            className="help-close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* FAQ */}
        <div className="help-section">
          <h3>Frequently Asked Questions</h3>

          {content.faqs.map((faq, index) => (
              <HelpAccordion
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() =>
                      setOpenIndex(
                          openIndex === index ? -1 : index
                      )
                  }
              />
          ))}
        </div>

        {/* Tips */}
        <div className="help-section">
          <h3>Helpful Tips</h3>

          <ul className="help-tips">
            {content.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="help-footer">

          <div className="help-support-card">
            <Mail size={18} />

            <div>
              <strong>Still need assistance?</strong>

              <span>
                hr@nocapcode.cloud
              </span>
            </div>
          </div>

        </div>

      </aside>
    </>
  );
};

export default HelpDrawer;