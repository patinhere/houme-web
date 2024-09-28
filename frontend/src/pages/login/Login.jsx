import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(inputs);
      setIsLoad(true);
      // navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  useEffect(() => {
    if (isLoad) {
      navigate("/");
      setIsLoad(false);
      setIsLoading(false);
    }
  }, [isLoad, navigate]);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            officia repudiandae nemo iste, hic reiciendis doloremque maxime
            quia? Perferendis quia placeat cum, natus exercitationem nesciunt ex
            debitis sit iste nulla.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin} disabled={isLoading ? true : false}>
              {isLoading ? "Loading..." : "Log In"}
            </button>
            <p style={{ color: "grey" }}>
              Test <br /> username:toto <br />
              password:1234
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
