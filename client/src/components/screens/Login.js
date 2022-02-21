import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
const axios = require("axios");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Enter axios");
    const url = "/api/auth/login";
    let resp = await axios.post(url, {
      email,
      password,
    });
    const { data } = { ...resp };

    if (data.success === true) {
      localStorage.setItem("auth", data.token);
      console.log("Logged");
      navigate(`/home`);
    } else {
      localStorage.removeItem("auth");
      navigate(`/failed`);
    }
  };

  return (
    <div>
      <article className="div">
        <div className="credentrials">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            className="input"
            autoComplete="false"
          />
        </div>
        <p>
          <Link to={`/forgotPassword`}>Forgot my password</Link>
        </p>
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
      </article>
    </div>
  );
};

export default Login;
