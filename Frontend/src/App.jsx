import React from "./page/React";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import UserDashboard from "./UserDashboard";
import AdminDashboard from"./AdminDashboard";
import UserProfile from "./page/UserProfile";


import NewsFeed from "./page/NewsFeed";
import ArticleDetails from "./page/ArticleDeatails";
import FactCheckInterface from "./components/FactCheckingInterface";
import AnnotationForm from "./components/AnnotationForm";
import SourceReliability from "./page/SourceReliability";
import SourceManagement from "./page/SourceManagement";



function App() {
  return (
    <>
      <React/>
      <Home />
      <Login/>
      <Register/>
      <UserDashboard />
      <AdminDashboard />

      <UserProfile/>
      <NewsFeed/>
      <ArticleDetails/>
      <FactCheckInterface/>
      <AnnotationForm/>
      <SourceReliability/>
      <SourceManagement/>

    </>
  );
}

export default App;
