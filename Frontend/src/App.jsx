import React from "./page/React";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import UserDashboard from "./UserDashboard";
import AdminDashboard from"./AdminDashboard";
function App() {
  return (
    <>
      <React/>
      <Home />
      <Login/>
      <Register/>
      <UserDashboard />
      <AdminDashboard />
      
    </>
  );
}

export default App;
