import React from "react";
// import ProgressBar from '../ProgressBar/ProgressBar'
import "./MainCard.css";
import { useThemeContext } from "../../context/ThemProvider";

// function findRequiredClasses(present, totalclasses) {
//   let requiredClasses = 0;
//   while (
//     (present + requiredClasses) / (totalclasses + requiredClasses) <
//     0.75
//   ) {
//     requiredClasses++;
//   }
//   return requiredClasses;
// }

const TimeTableCard = ({ present = 10, total = 10 }) => {
  const { currentColor, currentMode } = useThemeContext();

  return (
    <div
      style={{
        background: currentMode === "Dark" ? "#181818" : "",
        "--colorValue": currentColor,
      }}
      className="main-card time-table-card  d-flex-spaceb gapl glassomorphism"
    >
      {/* main-card-left starts here */}
      <div className="main-card-left card-left">
        <p
          style={{ borderColor: currentColor, "--value": currentColor }}
          className="subject-name"
        >
          Maths
        </p>
        <p className="attendance-text">
          Faculty Name:
          <b
            style={{
              color: "#3CB954",
            }}
          >
            Lorem Ipsum
          </b>
        </p>

        <p className="main-card-status">
          <b>Subject Code: </b> (18CSC205J)
        </p>
      </div>
      {/* main-card-left ends here */}

      {/* main-card-right starts here */}
      <div className="main-card-right">
        {/* <div className="main-card-dots d-flex-center fd-col">
          <span className="main-card-dot"></span>
          <span className="main-card-dot"></span>
          <span className="main-card-dot"></span>
        </div> */}
        {/* <ProgressBar
                    percentage={findPercentage(present, total)}
                /> */}
      </div>
      {/* main-card-right ends here */}
    </div>
  );
};

export default TimeTableCard;
