import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./share.scss";

import ImageIcon from "@mui/icons-material/Image";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imgUrl = "";
    if (file) imgUrl = await upload();

    try {
      await makeRequest.post("/history", {
        log: "share a post",
      });
    } catch (err) {
      console.log(err);
    }

    mutation.mutate({ desc: desc, pic: imgUrl });

    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.avatarHead} alt="" />
            <input
              type="text"
              value={desc}
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {file && (
              <img src={URL.createObjectURL(file)} alt="" className="file" />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <ImageIcon />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <PeopleOutlineIcon />
              <span>Tag friends</span>
            </div>
          </div>
          <div className="right">
            <button disabled={loading} onClick={handleClick}>
              {loading ? "Loading.." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
