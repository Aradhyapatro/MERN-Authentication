import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useParams();
  console.log(token);

  const navigate = useNavigate();

  const handleReset = async () => {
    if (password === confirmPassword) {
      const resp = await axios.put(
        `/api/auth/resetpassword/${token}`,
        { password },
        { "Content-Type": "application/json" }
      );
      const { data } = { ...resp };
      if (data.success === true) {
        navigate("/passwordChanged");
      }
    }
  };

  return (
    <div>
      <article className="div">
        <div className="credentrials">
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
        <div className="credentrials">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="confirmPassword"
            id="confirmPassword"
            className="input"
            autoComplete="false"
          />
        </div>
        <button
          onClick={() => {
            handleReset();
          }}
        >
          Reset
        </button>
      </article>
    </div>
  );
};

export default Reset;
