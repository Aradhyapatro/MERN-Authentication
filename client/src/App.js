import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./screens/Private";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { ForgotPass } from "./screens/ForgotPass";
import { Reset } from "./screens/Reset";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path="/resetpassword/:token" element={<Reset />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
