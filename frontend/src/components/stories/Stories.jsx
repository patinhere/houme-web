import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Story from "./Story.jsx";

const Stories = () => {
  return (
    <div className="stories">
      {[...Array(6)].map((_, index) => (
        <div className="story" key={index}>
          <Story index={index} />
        </div>
      ))}
    </div>
  );
};

export default Stories;
