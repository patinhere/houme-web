import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";

import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <Link
              to={"/profile/" + currentUser.id}
              style={{ textDecoration: "none" }}
            >
              <img src={"/upload/" + currentUser.profilePic} alt="" />
            </Link>
            <Link
              to={"/profile/" + currentUser.id}
              style={{ textDecoration: "none" }}
            >
              <span>{currentUser.name}</span>
            </Link>
          </div>
          <div className="item">
            <PeopleAltOutlinedIcon />
            <span>Friends</span>
          </div>
          <div className="item">
            <StarBorderOutlinedIcon />
            <span>Close friends</span>
          </div>
          <div className="item">
            <HistoryOutlinedIcon />
            <span>Memories</span>
          </div>
          <div className="item">
            <BookmarkBorderOutlinedIcon />
            <span>Save</span>
          </div>
          <div className="item">
            <CollectionsOutlinedIcon />
            <span>Gallery</span>
          </div>
          <div className="item">
            <CalendarMonthOutlinedIcon />
            <span>Events</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Groups</span>

          <div className="item">
            <GroupsOutlinedIcon />
            <span>World group</span>
          </div>
          <div className="item">
            <GroupsOutlinedIcon />
            <span>Single group</span>
          </div>
          <div className="item">
            <GroupsOutlinedIcon />
            <span>Gen Z group</span>
          </div>
          <div className="item">
            <GroupsOutlinedIcon />
            <span>Gen Y group</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
