import React from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import "./rightBar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () =>
      makeRequest.get("/suggestions").then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>

          <div className="user">
            {error ? (
              "error"
            ) : isLoading ? (
              "Loading.."
            ) : (
              <div>
                <div className="userInfo">
                  {data.map((suggest) => (
                    <div>
                      <img src={suggest.avatarHead} alt="" />
                      <span> {suggest.name} </span>

                      <div className="button">
                        <PersonAddAlt1OutlinedIcon />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <p>
                <span>Patty</span>
                <p>changed profile picture</p>
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <p>
                <span>Patty</span>
                <p>changed profile picture</p>
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <p>
                <span>Patty</span>
                <p>changed profile picture</p>
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <p>
                <span>Patty</span>
                <p>changed profile picture</p>
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        {/* <div className="item">
          <span>Online Friends</span>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <div className="online" />
              <span>Martin</span>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <div className="online" />
              <span>Martin</span>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <div className="online" />
              <span>Martin</span>
            </div>
          </div>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/19/03/40/avatar-2155431_960_720.png"
                alt=""
              />
              <div className="online" />
              <span>Martin</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightBar;
