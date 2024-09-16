import "./profile.scss";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import AvatarCanvas from "../../components/avatar/AvatarCanvas";

export default function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(1);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const { isLoading: risLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (isFriend) => {
      if (isFriend)
        return makeRequest.delete("/relationships?followedUserId=" + userId);
      return makeRequest.post("/relationships", { followedUserId: userId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    },
  });

  const handleFollow = async () => {
    mutation.mutate(relationshipData.includes(currentUser.id));

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
    <div className="profiles">
      {error ? (
        <Navigate to="/login" />
      ) : isLoading ? (
        "Loading.."
      ) : (
        <>
          <div className="container">
            <div className="images">
              {/* <img src={"/upload/" + data.coverPic} alt="" className="cover" /> */}
              <div className="cover">
                <AvatarCanvas
                  userId={data.id}
                  userAvatar={data.avatar}
                  animationIndex={animationIndex}
                  setAnimationIndex={setAnimationIndex}
                />
              </div>

              <img src={data.avatarHead} alt="" className="profilePic" />
            </div>

            <div className="profileContainer">
              <div className="userInfo">
                <div className="center">
                  <span>{data.name}</span>
                </div>
                <div className="left">
                  <DirectionsRunIcon
                    className="actionButton"
                    onClick={() => setAnimationIndex(10)}
                  />
                  <SportsMmaIcon
                    className="actionButton"
                    onClick={() => setAnimationIndex(0)}
                  />
                </div>

                <div className="right">
                  {risLoading ? (
                    "Loading"
                  ) : userId === currentUser.id ? (
                    <EditOutlinedIcon
                      className="actionButton"
                      onClick={() => setOpenUpdate(true)}
                    />
                  ) : (
                    <>
                      {relationshipData.includes(currentUser.id) ? (
                        <PersonRemoveIcon
                          className="actionButton"
                          onClick={handleFollow}
                        />
                      ) : (
                        <PersonAddAlt1OutlinedIcon
                          className="actionButton"
                          onClick={handleFollow}
                        />
                      )}

                      <MessageOutlinedIcon className="actionButton" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Posts userId={userId} />
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}
