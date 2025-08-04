import React from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";

import UserProfile from "./page/UserProfile";
import Dashboard from "./page/AdminDashabord";

 
function App() {
  return (
    <>
      <Home />
      <Login/>
      <Register/>
      <UserProfile/>

      <Dashboard/>
     
    </>
  );
}

export default App;
