import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Story = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["story"],
    queryFn: () =>
      makeRequest.get("/story").then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="stories">
      {error ? (
        "error"
      ) : isLoading ? (
        "Loading.."
      ) : (
        <div>
          {data.map((avatar) => (
            <div className="story" key={avatar.id}>
              <link to={"/profile/" + avatar.id}>
                <img src={avatar.avatarFullbody} alt="" />
                <span>{avatar.name}</span>
              </link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Story;
