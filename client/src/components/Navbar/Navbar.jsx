import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Signup/Login";
import { useThemeContext } from "../../context/ThemProvider";
import { useUserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";
import api from "../../axios";

const Navbar = () => {
  const { showNotification } = useNotificationContext();
  const { user, dispatch } = useUserContext();
  const { currentColor, currentMode, setMode } = useThemeContext();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(user);

  const SignupModal = () => {
    setIsSignupOpen(true);
  };
  const LoginModal = () => {
    setIsLoginOpen(true);
  };
  const location = useLocation();

  const handleBurger = () => {
    document.getElementById("burger").classList.toggle("is-active");
    document.getElementById("menu").classList.toggle("is-active");
  };

  //to handle ui
  useEffect(() => {
    window.addEventListener("scroll", () => {
      document
        .getElementById("header")
        .classList.toggle("on-scroll", window.scrollY > 0);
    });

    // //?Close Navbar Menu on Click Menu Links
    document.querySelectorAll(".menu_link").forEach((link) => {
      link.addEventListener("click", () => {
        document.getElementById("burger").classList.remove("is-active");
        document.getElementById("menu").classList.remove("is-active");
      });
    });
  }, []);

  // to fetch user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/auth/user");
        dispatch({ type: "UPDATE_USER", payload: data });
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const percentage_required = localStorage.getItem("percentage_required")
    

    dispatch({ type: "UPDATE_PERCENTAGE_REQUIRED", payload: parseInt(percentage_required) });


  }, [])
  

  return (
    <>
      <Signup isOpen={isSignupOpen} setIsModalOpen={setIsSignupOpen} />
      <Login isOpen={isLoginOpen} setIsModalOpen={setIsLoginOpen} />

      <header
        style={{ "--current-color": currentColor }}
        className="header"
        id="header"
      >
        <nav className="navbar container d-flex-spaceb">
          <div className="left d-flex-center gapl">
            {/* <Link to="/" className="brand"> Gaurav </Link> */}
            {/* <Link to="/" className="brand d-flex-center">
             <img src={logo} alt="" /> 
            </Link> */}
            <div onClick={handleBurger} className="burger" id="burger">
              <span className="burger_line"></span>
              <span className="burger_line"></span>
              <span className="burger_line"></span>
            </div>

            <Link to="/" className="brand">
              {" "}
              ADG{" "}
            </Link>
          </div>

          <div className="right d-flex-center gapl">
            <div className="menu" id="menu">
              <ul className="menu-inner d-flex-center fd-col">
                <li className="menu_item">
                  <Link
                    to="/"
                    className={`menu_link ${
                      location.pathname === "/" ? "active_link" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>

                <li className="menu_item">
                  <Link
                    to="/time-table"
                    className={`menu_link ${
                      location.pathname === "/time-table" ? "active_link" : ""
                    }`}
                  >
                    Time Table
                  </Link>
                </li>
                <li className="menu_item">
                  <Link
                    to="/contact"
                    className={`menu_link ${
                      location.pathname === "/contact" ? "active_link" : ""
                    }`}
                  >
                    {" "}
                    Contact{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div
              onClick={() =>
                currentMode === "Light" ? setMode("Dark") : setMode("Light")
              }
              className="light_dark"
            >
              <span className="material-icons">
                {currentMode === "Dark" ? "dark_mode" : "light_mode"}
              </span>
            </div>

            <div className="login_signup">
              {user?.user?.name === undefined || null ? (
                <>
                  <button
                    disabled={loading}
                    onClick={SignupModal}
                    className="menu_block login_signup_btn"
                  >
                    Sign up
                  </button>
                  <button
                    disabled={loading}
                    onClick={LoginModal}
                    className="menu_block login_signup_btn"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch({ type: "LOGOUT_USER" });
                      showNotification(
                        "warning",
                        "Logged out!",
                        2000,
                        "top",
                        "Logged out!"
                      );
                    }}
                    className=" user_found menu_block user_logout "
                  >
                    Logout
                  </button>

                  <button className=" user_found menu_block ">
                    {user?.user?.name.split(" ")[0]}
                  </button>
                </>
              )}

              {/* <div
                onClick={handleBurger}
                className="burger" id="burger">
                <span className="burger_line"></span>
                <span className="burger_line"></span>
                <span className="burger_line"></span>
              </div> */}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
