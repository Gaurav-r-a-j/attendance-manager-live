import React, { useEffect, useState } from "react";
import "./SetGoalModal.css";
import { useThemeContext } from "../../context/ThemProvider";
import { useUserContext } from "../../context/UserContext";

const SetGoalModal = ({ isOpen, onRequestClose }) => {
  const { user, dispatch } = useUserContext();
  console.log(user);
  const [rangeValue, setRangeValue] = useState(
    parseInt(localStorage.getItem("percentage_required")) ?? 0
  );
  const [percentageRequired, setPercentageRequired] = useState(0);
  const { currentColor } = useThemeContext();

  //   const debounce = (func, wait) => {
  //     let timeout;
  //     return function executedFunction(...args) {
  //       const later = () => {
  //         clearTimeout(timeout);
  //         func(...args);
  //       };
  //       clearTimeout(timeout);
  //       timeout = setTimeout(later, wait);
  //     };
  //   };

  const handleRangeChange = (e) => {
    setRangeValue(parseInt(e.target.value));
    setPercentageRequired(parseInt(e.target.value));
    if (e.target.value < 90) {
      localStorage.setItem("percentage_required", e.target.value);
      dispatch({
        type: "UPDATE_PERCENTAGE_REQUIRED",
        payload: e.target.value,
      });
    }
  };

  if (!isOpen) {
    return;
  }

  return isOpen ? (
    <div
      onClick={onRequestClose}
      style={{ "--current-color": currentColor }}
      className="set-goal-modal-overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="set-goal-modal"
      >
        {/* <h2>Set Attendance Goal</h2> */}
        <div className="set-goal-modal-progress">
          <svg className="set-goal-modal-progress-circle">
            <circle
              className="set-goal-modal-progress-circle-trail"
              cx="50%"
              cy="50%"
              r="40%"
            />
            <circle
              className="set-goal-modal-progress-circle-path"
              cx="50%"
              cy="50%"
              r="40%"
              stroke={currentColor}
              style={{
                strokeDasharray: `${rangeValue}, 100`,
              }}
            />
            <text
              className="set-goal-modal-progress-circle-text"
              x="50%"
              y="50%"
            >
              {rangeValue}%
            </text>
          </svg>
        </div>
        <div className="set-goal-modal-controls">
          <div className="set-goal-modal-control">
            <label htmlFor="range-input">Range</label>
            <div className="set-goal-modal-range">
              <span>0%</span>
              <input
                id="range-input"
                type="range"
                min="0"
                max="100"
                value={rangeValue}
                onChange={handleRangeChange}
              />
              <span>100%</span>
            </div>
          </div>
          {/* <div className="set-goal-modal-control">
            <label htmlFor="color-input">Color</label>
            <div className="set-goal-modal-color">
              <input
                id="color-input"
                type="color"
                value={color}
                onChange={(event) => handleColorChange(event.target.value)}
              />
            </div>
          </div> */}
        </div>
        <button onClick={onRequestClose} className="set-goal-modal-button">
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default SetGoalModal;
