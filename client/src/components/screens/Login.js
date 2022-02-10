import React, { useState } from "react";
import { axios } from "axios";
import "./Login.css";
const Login = () => {
  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Enter axios");
    axios
      .post("/api/auth/login", {
        email: user_email,
        password: password,
      })
      .then((resp) => {
        console.log("Logged in");
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <article className="div">
        <div className="credentrials">
          <label htmlFor="user_email">Username</label>
          <input
            type="text"
            autoComplete="off"
            id="user_email"
            className="input"
            value={user_email}
            onChange={(e) => {
              setUser_email(e.target.value);
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
