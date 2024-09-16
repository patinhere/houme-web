import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";

import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { LeftBarContext } from "../../context/leftBarContext";
import { RightBarContext } from "../../context/rightBarContext";

const Navbar = () => {
  const { toggleL } = useContext(LeftBarContext);
  const { toggleR } = useContext(RightBarContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const [islogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    await makeRequest.post("/auth/logout");
    setIsLogout(true);
  };

  useEffect(() => {
    if (islogout) {
      setIsLogout(false);
      navigate("/login");
    }
  }, [islogout, navigate]);

  return (
    <div className="navbar">
      <div className="left">
        <div className="leftSideBarButton">
          <ArrowBackIosIcon onClick={toggleL} />
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Hoûme</span>
        </Link>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
      </div>

      <div className="right">
        {darkMode ? (
          <LightModeOutlinedIcon className="darkMode" onClick={toggle} />
        ) : (
          <NightlightOutlinedIcon className="darkMode" onClick={toggle} />
        )}
        <div className="user">
          <Link
            to={"/profile/" + currentUser.id}
            style={{ textDecoration: "none" }}
          >
            <img className="button" src={currentUser.avatarHead} alt="" />
          </Link>
          <button className="logout" onClick={handleLogout}>
            <LogoutIcon />
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Log Out
            </Link>
          </button>
        </div>
      </div>

      <div className="rightSideBarButton">
        <ArrowForwardIosIcon onClick={toggleR} />
      </div>
    </div>
  );
};

export default Navbar;
