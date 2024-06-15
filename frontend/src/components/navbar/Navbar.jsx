import React, { useContext, useEffect, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import LeftBar from "../leftBar/LeftBar";
import { LeftBarContext } from "../../context/leftBarContext";
import { RightBarContext } from "../../context/rightBarContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleL, leftBarOpen } = useContext(LeftBarContext);
  const { toggleR, rightBarOpen } = useContext(RightBarContext);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("work");
    localStorage.removeItem("user");
    await makeRequest.post("/auth/logout");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Hoûme</span>
        </Link>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
      </div>

      {/* <div className="middle">
        <Link to="/map" style={{ textDecoration: "none" }}>
          <PublicOutlinedIcon />
        </Link>
        <HolidayVillageOutlinedIcon />
        <Link to="/" style={{ textDecoration: "none" }}>
          <DynamicFeedOutlinedIcon />
        </Link>
      </div> */}

      <div className="right">
        {darkMode ? (
          <LightModeOutlinedIcon className="darkMode" onClick={toggle} />
        ) : (
          <NightlightOutlinedIcon className="darkMode" onClick={toggle} />
        )}
        <div className="user">
          <img
            className="button"
            onClick={() => setMenuOpen(!menuOpen)}
            src={currentUser.avatarHead}
            alt=""
          />
          <span className="button" onClick={() => setMenuOpen(!menuOpen)}>
            {currentUser.name}
          </span>
        </div>
      </div>
      <div className="leftSideBarButton">
        <ViewSidebarOutlinedIcon onClick={toggleL} />
      </div>
      <div className="rightSideBarButton">
        <ViewSidebarOutlinedIcon onClick={toggleR} />
      </div>

      {menuOpen && (
        <button className="logout" onClick={handleLogout}>
          <LogoutIcon />
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Log Out
          </Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
