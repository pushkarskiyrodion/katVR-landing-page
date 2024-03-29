import React from "react";
import PropTypes from "prop-types";

export const CloseIcon = ({ onClose, className = '' }) => (
  <i onClick={onClose} className={`icon icon--close ${className}`}>
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.35355"
        y1="0.995568"
        x2="18.2206"
        y2="17.8626"
        stroke="white"
      />
      <path d="M1.13405 17.8672L18.0011 1.00011" stroke="white" />
    </svg>
  </i>
);

CloseIcon.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
};
