import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { PrivateRoute } from "./screens/Private";
import { default as Login } from "./components/screens/Login";
import { default as Register } from "./components/screens/Register";
import { default as ForgotPass } from "./components/screens/ForgotPass";
import { default as Reset } from "./components/screens/Reset";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path="/resetpassword/:token" element={<Reset />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
