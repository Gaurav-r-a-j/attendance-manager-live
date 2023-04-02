import React, { useState } from "react";
import { useThemeContext } from "../../context/ThemProvider";
import { useUserContext } from "../../context/UserContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import SetGoalModal from "../SetGoal/Setgoal";
import "./BigCard.css";

const BigCard = () => {
  const { user } = useUserContext();
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const { currentColor, currentMode } = useThemeContext();

  return (
    <>
      <SetGoalModal
        isOpen={goalModalOpen}
        onRequestClose={() => setGoalModalOpen(false)}
      />
      <div
        style={{ background: currentMode === "Dark" ? "#181818" : "" }}
        className="big-card  d-flex-spaceb gapl glassomorphism"
      >
        {/* cart-left starts here */}
        <div className="card-left gaps">
          <div onClick={() => setGoalModalOpen(true)} className="icon-text">
            <span className="material-icons">flag</span>
            <p className="text">Goal</p>
            <b>{user?.percentage_required}%</b>
          </div>
          <div className="icon-text">
            <span className="material-icons">check</span>
            <p className="text">overall attendace</p>
            <b>75%</b>
          </div>
          {/* icon-text ends here */}

          <div className="option-icons gaps">
            <span className="material-icons">signal_cellular_alt</span>
            <span className="material-icons">show_chart</span>
            <span className="material-icons">dark_mode</span>
            <span className="material-icons">settings</span>
          </div>
          {/* option icons ends here */}
        </div>
        {/* cart-left ends here */}

        <div className="card-right">
          <ProgressBar />
        </div>
      </div>
    </>
  );
};

export default BigCard;
