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

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const gen = inputs.gender === "female" ? "female" : "male";
    const random = Math.floor(Math.random() * 10) + 1;
    const avatarFile = "/upload/avatar/glb/" + gen + random + ".glb";
    const avatarHeadFile =
      "/upload/avatar/head/" + gen + "Head" + random + ".png";
    const avatarFullbodyFile =
      "/upload/avatar/fullbody/" + gen + "Fullbody" + random + ".png";

    formData.set("file", avatarFile);
    try {
      const res = await makeRequest.post("/uploadAvatar", formData);
      setInputs((prev) => ({
        ...prev,
        avatar: res.url,
      }));

      return res.data;
    } catch (err) {
      console.log(err);
    }

    formData.set("file", avatarHeadFile);
    try {
      const res = await makeRequest.post("/uploadAvatar", formData);
      setInputs((prev) => ({
        ...prev,
        avatarHead: res.url,
      }));

      return res.data;
    } catch (err) {
      console.log(err);
    }

    formData.set("file", avatarFullbodyFile);
    try {
      const res = await makeRequest.post("/uploadAvatar", formData);
      setInputs((prev) => ({
        ...prev,
        avatarFullbody: res.url,
      }));

      return res.data;
    } catch (err) {
      console.log(err);
    }

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
