import React from "react";
import { useThemeContext } from "../../context/ThemProvider";
import "./ThemeSettings.css";

const themeColors = [
  {
    name: "light-black-theme",
    color: "#181818",
  },
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "red-theme",
    color: "#BB004B",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
//   {
//     name: "gradient-theme-1",
//     color:
//       " linear-gradient(90deg, rgba(61,52,215,1) 0%, rgba(70,70,204,1) 11%, rgba(161,87,219,1) 39%, rgba(212,52,217,1) 60%, rgba(0,212,255,1) 100%)",
//   },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

const ThemeSettings = () => {
  const {
    currentColor,
    setMode,
    currentMode,
    setColor,
    setThemeSettings,
    themeSettings,
  } = useThemeContext();

  return (
    <div
      onClick={() => setThemeSettings(false)}
      className="overlay theme-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`theme-settings ${
          !themeSettings ? "theme-settings-active" : ""
        }`}
      >
        <div className="d-flex-spaceb theme-sections">
          <h2>Settins</h2>
          <span
            onClick={() => setThemeSettings(false)}
            className="material-icons cancel-btn"
          >
            cancel
          </span>
        </div>

        <div className="theme-sections">
          <h2>Theme Options</h2>
          <div className="theme-option">
            <input
              type="radio"
              name="mode"
              id="light"
              value="Light"
              onChange={(e) => setMode(e.target.value)}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light">Light</label>
          </div>
          <div className="theme-option">
            <input
              type="radio"
              name="mode"
              id="dark"
              value="Dark"
              onChange={(e) => setMode(e.target.value)}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark">Dark</label>
          </div>
        </div>
        <div className="theme-sections">
          <h2>Theme Colors</h2>
          <div className="theme-colors  gaps">
            {themeColors.map((item, index) => (
              <button
                type="button"
                className=" h-10 w-10 cursor-pointer rounded-full"
                style={{ background: item.color }}
                onClick={() => setColor(item.color)}
              ></button>
            ))}
            <div className="color-picker d-flex-center">
              <label htmlFor="color-picker"></label>
              <input
                onInput={(e) => {
                  // console.log(e.target.value)
                  e.stopPropagation();
                  setColor(e.target.value);
                  setThemeSettings(true);
                }}
                type="color"
                name="color-picker"
                id="color-picker"
                value={currentColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
