import React from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import "./rightBar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () =>
      makeRequest.get("/suggestions").then((res) => {
        return res.data;
      }),
  });

  const followMutation = useMutation({
    mutationFn: (userId) => {
      return makeRequest.post("/relationships", { followedUserId: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
      queryClient.invalidateQueries(["suggestions"]);
    },
  });

  const handleFollow = async (userId) => {
    followMutation.mutate(userId);

    try {
      await makeRequest.post("/history", {
        userId: userId,
        log: "follow",
      });
    } catch (err) {
      console.log(err);
    }
  };

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
                <div>
                  {data.map((suggest) => (
                    <div className="userInfo" key={suggest.id}>
                      <Link
                        to={"/profile/" + suggest.id}
                        style={{ textDecoration: "none" }}
                      >
                        <img src={suggest.avatarHead} alt="" />
                        <span> {suggest.name} </span>
                      </Link>
                      <div className="button">
                        <PersonAddAlt1OutlinedIcon
                          onClick={() => handleFollow(suggest.id)}
                        />
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
