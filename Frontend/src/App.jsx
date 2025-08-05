import React from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import UserDashboard from "./page/UserDashboard";
function App() {
  return (
    <>
      <Home />
      <Login/>
      <Register/>
      <UserDashboard />
    </>
  );
}

export default App;
