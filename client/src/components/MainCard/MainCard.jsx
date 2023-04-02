import React, { useMemo } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./MainCard.css";
import { useThemeContext } from "../../context/ThemProvider";
import { useUserContext } from "../../context/UserContext";

function findPercentage(present, total) {
  let percentage = (present / total) * 100;
  return Math.floor(percentage);
}

function findRequiredClasses(present, totalclasses, percentage_required) {
  let requiredClasses = 0;
  while (
    (present + requiredClasses) / (totalclasses + requiredClasses) <
    percentage_required / 100
  ) {
    requiredClasses++;
  }
  // let requiredClasses = 0.75 * totalclasses;
  // let required = requiredClasses - present;
  return requiredClasses;
}

function findTakeLeave(present, totalclasses, percentage_required) {
  let percentLeave = (percentage_required / 100) * totalclasses;
  let leave = Math.floor(present - percentLeave);
  return leave;
}

const MainCard = ({ present = 10, total = 10, subjectName = "Maths" }) => {
  const { currentColor, currentMode } = useThemeContext();
  const { user } = useUserContext();

  const requiredClasses = useMemo(
    () => findRequiredClasses(present, total, user?.percentage_required),
    [present, total, user?.percentage_required]
  );
  const takeLeave = useMemo(
    () => findTakeLeave(present, total, user?.percentage_required),
    [present, total, user?.percentage_required]
  );

  return (
    <div
      style={{
        background: currentMode === "Dark" ? "#181818" : "",
        "--colorValue": currentColor,
      }}
      className="main-card  d-flex-spaceb gapl glassomorphism"
    >
      {/* main-card-left starts here */}
      <div className="main-card-left card-left">
        <p
          style={{ borderColor: currentColor, "--value": currentColor }}
          className="subject-name"
        >
          {subjectName}
        </p>
        <p className="attendance-text">
          Attendacne:
          <b
            style={{
              color: `${
                present / total > user?.percentage_required / 100
                  ? "#3CB954"
                  : "#F44336"
              }`,
            }}
          >
            {present + "/" + total}
          </b>
        </p>

        <p className="main-card-status">
          {present / total <= user?.percentage_required / 100 ? (
            <>
              <b>Status: </b> you need to attend next{" "}
              <span>
                {/* {" "}
                {findRequiredClasses(
                  present,
                  total,
                  user?.percentage_required
                )}{" "} */}
                {requiredClasses}
              </span>{" "}
              class to get 75%.
            </>
          ) : (
            <>
              <b>Status: </b>On Track, You may leave next{" "}
              <span style={{ color: "#3BB854" }}>{takeLeave}</span> classes.
            </>
          )}
        </p>
      </div>
      {/* main-card-left ends here */}

      {/* main-card-right starts here */}
      <div className="main-card-right">
        <div className="main-card-dots d-flex-center fd-col">
          <span className="main-card-dot"></span>
          <span className="main-card-dot"></span>
          <span className="main-card-dot"></span>
        </div>
        <ProgressBar percentage={findPercentage(present, total)} />
      </div>
      {/* main-card-right ends here */}
    </div>
  );
};

export default MainCard;
