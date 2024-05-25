import { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";

const Update = ({ setOpenUpdate, user }) => {
  const [texts, setTexts] = useState({
    name: "",
  });

  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = coverPic ? await upload(coverPic) : user.coverPic;
    profileUrl = profilePic ? await upload(profilePic) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });

    setCoverPic(null);
    setProfilePic(null);
    setOpenUpdate(false);
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  return (
    <div className="update">
      <div className="container">
        <form className="form">
          <input
            className="coverpic"
            type="file"
            name="coverPic"
            id="coverPic"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
          <label htmlFor="coverPic">
            <span>Edit Cover Image</span>
          </label>
          <hr />
          <input
            className="profilePic"
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <label htmlFor="profilePic">
            <span>Edit Profile Image</span>
          </label>
          <input
            type="text"
            name="name"
            className="name"
            id="name"
            onChange={handleChange}
          />
          <label htmlFor="name">
            <span>Edit Name</span>
          </label>
          <button className="click" onClick={handleClick}>
            {" "}
            Update{" "}
          </button>
        </form>
        <button className="exit" onClick={() => setOpenUpdate(false)}>
          Close X
        </button>
      </div>
    </div>
  );
};

export default Update;
