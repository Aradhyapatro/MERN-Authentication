import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {localStorage.getItem("auth") ? (
        <h1>Logged in</h1>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Home;
