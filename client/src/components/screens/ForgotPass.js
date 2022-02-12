import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const navigator = useNavigate();

  const handleForgot = async () => {
    const resp = await axios.post(
      "/api/auth/forgotPassword",
      { email },
      { "Content-Type": "application/json" }
    );

    const { data } = { ...resp };
    if (data.success === true) {
      navigator(`/declaration`);
    }
  };

  return (
    <div>
      <article className="div">
        <div className="credentrials">
          <label htmlFor="email">Enter your Registered Email</label>
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

          <button
            onClick={() => {
              handleForgot();
            }}
          >
            Submit
          </button>
        </div>
      </article>
    </div>
  );
};

export default ForgotPass;
