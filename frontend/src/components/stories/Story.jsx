import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Story = ({ index }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["story", index],
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
              <Link to={"/profile/" + avatar.id}>
                <img src={avatar.avatarFullbody} alt="" />
                <span>{avatar.name}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Story;
