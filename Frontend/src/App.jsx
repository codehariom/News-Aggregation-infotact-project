import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import UserProfile from "./page/UserProfile";
import SubmitArticleForm from "./page/SubmitArticle";
import ArticleCard from "./components/ArticleCard";
import NewsFeed from "./page/NewsFeed";
import ArticleDetails from "./page/ArticleDeatails";
import FactCheckInterface from "./components/FactCheckingInterface";
import AnnotationForm from "./components/AnnotationForm";
import SourceReliability from "./page/SourceReliability";
import SourceManagement from "./page/SourceManagement";
import AdminDashboard from "./page/AdminDashboard";
import ErrorPage from "./page/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/news-feed" element={<NewsFeed />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/fact-checking" element={<FactCheckInterface />} />
        <Route path="/annotation" element={<AnnotationForm />} />
        <Route path="/source-reliability" element={<SourceReliability />} />
        <Route path="/source-management" element={<SourceManagement />} />
        <Route path="/submit-article" element={<SubmitArticleForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
