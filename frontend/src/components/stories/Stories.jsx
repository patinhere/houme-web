import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Story from "./Story.jsx";

const Stories = () => {
  return (
    <div className="stories">
      <div className="story">
        <Story />
      </div>
      <div className="story">
        <Story />
      </div>
      <div className="story">
        <Story />
      </div>
      <div className="story">
        <Story />
      </div>
      <div className="story">
        <Story />
      </div>
      <div className="story">
        <Story />
      </div>
    </div>
  );
};

export default Stories;
