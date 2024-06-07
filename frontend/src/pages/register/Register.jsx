import React, { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    gender: "",
    avatar: "",
    avatarHead: "",
    avatarFullbody: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const fetchFile = async (filePath) => {
  //   try {
  //     const response = await fetch(filePath);
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
  //     }
  //     const blob = await response.blob();
  //     const file = new File([blob], filePath.split("/").pop(), {
  //       type: blob.type,
  //     });
  //     return file;
  //   } catch (error) {
  //     console.error("Error fetching the file:", error);
  //     return null;
  //   }
  // };

  // const uploadFile = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     const res = await makeRequest.post("/uploadAvatar", formData);
  //     return res.data.url;
  //   } catch (err) {
  //     console.error("Error uploading the file:", err);
  //     return null;
  //   }
  // };

  const getAvatar = async (random) => {
    try {
      const res = await makeRequest.get("/getAvatar", +random);
      return res.data;
    } catch (err) {
      console.error("Error uploading the file:", err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const gen = inputs.gender === "female" ? "female" : "male";
    let random = Math.floor(Math.random() * 10) + 1;
    if (gen === "male") random = +10;

    // const avatarFile = `/upload/avatar/glb/${gen}${random}.glb`;
    // const avatarHeadFile = `/upload/avatar/head/${gen}Head${random}.png`;
    // const avatarFullbodyFile = `/upload/avatar/fullbody/${gen}Fullbody${random}.png`;

    // const avatarF = await fetchFile(avatarFile);
    // const avatarHeadF = await fetchFile(avatarHeadFile);
    // const avatarFullbodyF = await fetchFile(avatarFullbodyFile);

    // if (avatarF && avatarHeadF && avatarFullbodyF) {
    //   const avatarUrl = await uploadFile(avatarF);
    //   const avatarHeadUrl = await uploadFile(avatarHeadF);
    //   const avatarFullbodyUrl = await uploadFile(avatarFullbodyF);

    //   console.log(avatarUrl, avatarHeadUrl, avatarFullbodyUrl);

    const avatar = await getAvatar(random);

    setInputs((prev) => ({
      ...prev,
      avatar: avatar.avatarglb,
      avatarHead: avatar.avatarHead,
      avatarFullbody: avatar.avatarFullbody,
    }));

    try {
      await axios.post(
        "https://houme-web.onrender.com/api/auth/register",
        inputs
      );

      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Welcome</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            officia repudiandae nemo iste, hic reiciendis doloremque maxime
            quia? Perferendis quia placeat cum, natus exercitationem nesciunt ex
            debitis sit iste nulla.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Hoûme</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <fieldset>
              <legend>Select gender:</legend>
              <div>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  name="gender"
                  onChange={handleChange}
                />
                <label for="female">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  name="gender"
                  onChange={handleChange}
                />
                <label for="male">Male</label>
              </div>
            </fieldset>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
