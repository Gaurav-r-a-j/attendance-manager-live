import React from "react";
import TimeTableCard from "../../components/MainCard/TimeTableCard";
import { useThemeContext } from "../../context/ThemProvider";
import "./TimeTable.css";

const TimeTable = () => {
  const { currentColor, currentMode, setMode } = useThemeContext();

  return (
    <div
      style={{ "--current-color": currentColor }}
      className="time-table  pds"
    >
      <div
        style={{ background: currentMode === "Dark" ? "black" : currentColor }}
        className="time-table-container d-flex-center "
      >
        <div className="day">
          <p className="glassomorphism">Monday</p>
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
        </div>
        <div className="day">
          <p className="glassomorphism">Tuesday</p>
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
        </div>
        <div className="day">
          <p className="glassomorphism">Wednesday</p>
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
        </div>
        <div className="day">
          <p className="glassomorphism">Thrusday</p>
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
        </div>
        <div className="day">
          <p className="glassomorphism">Friday</p>
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
          <TimeTableCard />
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
