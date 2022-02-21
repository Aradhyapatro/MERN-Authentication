import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  let navigate = useNavigate();

  const handleregister = async () => {
    const url = "/api/auth/register";
    let resp = await axios.post(url, { email, password, username });
    resp = resp.data;

    if (resp.success === true) {
      console.log("registered");
      localStorage.setItem("auth", resp.token);
      navigate(`/home`);
    } else {
      console.log("Could not register");
      navigate(`/failed`);
    }
  };

  return (
    <div className="body">
      <div className="credentrials">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          autoComplete="off"
          id="username"
          className="input"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="email">email</label>
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
        <Link to={`/login`}>Already have a account</Link>
      </p>
      <button
        onClick={() => {
          handleregister();
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
