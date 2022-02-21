import axios from "axios";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    const checkCondition = async () => {
      try {
        const headers = {
          authorization: `Bearer ${localStorage.getItem("auth")}`,
          "My-Custom-Header": "foobar",
        };
        const { data } = await axios.get(
          "/api/private",
          { headers },
          {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("auth")}`,
          }
        );
        console.log(data);
        if (data.destination !== "Private data route accessed") {
          localStorage.removeItem("auth");
        } else {
          console.log("No error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkCondition();
  }, []);

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
