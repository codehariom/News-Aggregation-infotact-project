import React from "react";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
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
      <Home />
      <Login/>
      <Register/>
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
