import React from "react";
import { useThemeContext } from "../../context/ThemProvider";
import { useUserContext } from "../../context/UserContext";
import BigCard from "../BigCard/BigCard";
// import ProgressBar from '../ProgressBar/ProgressBar'
import "./UserBackground.css";

// const formatAadhar = (text) => {
//   console.log("if")
//   if (text?.length === 4 || text?.length === 9 || text?.length === 14) {
//     text = text += ' ';
//     console.log(text)

//   }
// }

const formatAadharNumber = (aadharNumber) => {
  return aadharNumber.replace(/(\d{4})/g, "$1 ").trim();
};

const UserBackground = () => {
  const { currentMode, currentColor } = useThemeContext();
  const { user } = useUserContext();

  const handleAadharCopy = (aadhar) => {
    console.log(aadhar);
    navigator.clipboard.writeText(aadhar);
    // setShowCopy(prev => !prev)
  };

  return (
    <div
      style={{ "--current-color": currentColor }}
      className="user-background w100"
    >
      {!user?.user && (
        <h1 className="w100 sample-text">
          This is just a sample data ! <small>Login to View yours.</small>{" "}
        </h1>
      )}
      <div className="user-background-content pdl d-flex-center gapl">
        {/* left starts here */}
        <div className="left ">
          <div className="user-profile pdl d-flex-center gapl">
            {/* for user image */}
            <div
              // style={{ background: currentColor }}
              className="user-img d-flex-center"
            >
              <img src="" alt="" />
              <span className="material-icons">account_circle</span>
            </div>

            {/* <ProgressBar /> */}

            <div className="user-name">
              <p
                style={{
                  color: currentColor !== "#181818" ? currentColor : "",
                }}
              >
                {" "}
                {user?.user?.name ?? "Gaurav raj"}{" "}
              </p>
              <small>Sec:{user?.user?.section ?? "L"}</small>
              <small>Sem: {user?.user?.semester ?? "6"}</small>
              <div className="adhar-number d-flex-center gaps">
                <p>
                  {user?.user?.aadharNumber
                    ? formatAadharNumber(user?.user?.aadharNumber)
                    : "1111 1111 1111"}
                </p>
                <span
                  onClick={(aadhar) => {
                    handleAadharCopy(user?.user?.aadharNumber);
                  }}
                  style={{
                    background: currentColor !== "#181818" ? currentColor : "",
                  }}
                  className="material-icons d-flex-center"
                >
                  content_copy
                </span>
              </div>
              {/* <small>copied!</small> */}
            </div>
          </div>
        </div>
        {/* left ends here */}

        {/* right starts here */}
        <div className="right">
          <BigCard />
        </div>
        {/* right ends here */}
      </div>
    </div>
  );
};

export default UserBackground;
