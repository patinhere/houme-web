import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const stories = [
    {
      id: 1,
      name: "Patty",
      img: "https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_960_720.jpg",
    },
    {
      id: 2,
      name: "Martin",
      img: "https://cdn.pixabay.com/photo/2015/08/06/16/00/forest-878029_960_720.jpg",
    },
    {
      id: 3,
      name: "Pauy",
      img: "https://cdn.pixabay.com/photo/2017/08/25/09/52/mikulov-2679581_960_720.jpg",
    },
    {
      id: 4,
      name: "Pipi",
      img: "https://cdn.pixabay.com/photo/2016/09/19/22/46/lake-1681485_1280.jpg",
    },
    {
      id: 5,
      name: "Popo",
      img: "https://media.istockphoto.com/id/1195316381/photo/a-horse-grazes-in-a-field-filled-with-palm-trees.jpg?s=2048x2048&w=is&k=20&c=BpUV-nHFztpffPXop8ZJ12QyzQXg7hPGFF7Gi9xPNNA=",
    },
  ];
  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.avatarFullbody} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
