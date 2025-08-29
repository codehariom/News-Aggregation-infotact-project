import React, { useState } from 'react';

// Simulated in-memory data stores
const initialNewsContent = [
  {
    id: 1,
    title: "Sample News Article",
    body: "This is a sample news article for aggregation.",
    author: "user1",
    status: "pending",
    source: "User Submission",
    createdAt: new Date(),
    flagReason: null,
  },
];

const initialUsers = [
  { id: "user1", username: "john_doe", role: "user" },
  { id: "admin1", username: "admin_user", role: "admin" },
];

// Main ContentModeration component
function ContentModeration({ currentUser = "user1", setCurrentUser }) {
  const [newsContent, setNewsContent] = useState(initialNewsContent);
  const [users] = useState(initialUsers);

  // Check if user is admin
  const isAdmin = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user && user.role === "admin";
  };

  // Submit news
  const submitNews = (userId, title, body, source = "User Submission") => {
    if (!title || !body) {
      return { success: false, message: "Title and body are required." };
    }
    const newNews = {
      id: newsContent.length + 1,
      title,
      body,
      author: userId,
      status: "pending",
      source,
      createdAt: new Date(),
      flagReason: null,
    };
    setNewsContent([...newsContent, newNews]);
    return { success: true, message: "News submitted for admin review.", news: newNews };
  };

  // Review news
  const reviewNews = (adminId, newsId) => {
    if (!isAdmin(adminId)) {
      return { success: false, message: "Unauthorized: Admin role required." };
    }
    const news = newsContent.find((n) => n.id === newsId);
    if (!news) {
      return { success: false, message: "News article not found." };
    }
    return { success: true, message: "News details retrieved for review.", news };
  };

  // Approve news
  const confirmNews = (adminId, newsId) => {
    if (!isAdmin(adminId)) {
      return { success: false, message: "Unauthorized: Admin role required." };
    }
    const news = newsContent.find((n) => n.id === newsId);
    if (!news) {
      return { success: false, message: "News article not found." };
    }
    if (news.status !== "pending" && news.status !== "flagged") {
      return { success: false, message: "News is not in pending or flagged state." };
    }
    const updatedNews = { ...news, status: "approved", flagReason: null };
    setNewsContent(newsContent.map((n) => (n.id === newsId ? updatedNews : n)));
    return { success: true, message: "News approved for publication.", news: updatedNews };
  };

  // Delete news
  const deleteNews = (adminId, newsId) => {
    if (!isAdmin(adminId)) {
      return { success: false, message: "Unauthorized: Admin role required." };
    }
    const newsIndex = newsContent.findIndex((n) => n.id === newsId);
    if (newsIndex === -1) {
      return { success: false, message: "News article not found." };
    }
    const updatedNews = { ...newsContent[newsIndex], status: "deleted", flagReason: null };
    setNewsContent(newsContent.map((n) => (n.id === newsId ? updatedNews : n)));
    return { success: true, message: "News deleted.", news: updatedNews };
  };

  // Flag news
  const flagNews = (userId, newsId, flagReason) => {
    const news = newsContent.find((n) => n.id === newsId);
    if (!news) {
      return { success: false, message: "News article not found." };
    }
    if (news.status !== "approved") {
      return { success: false, message: "Only approved news can be flagged." };
    }
    if (!flagReason) {
      return { success: false, message: "Flag reason is required." };
    }
    const updatedNews = { ...news, status: "flagged", flagReason };
    setNewsContent(newsContent.map((n) => (n.id === newsId ? updatedNews : n)));
    return { success: true, message: "News flagged for review.", news: updatedNews };
  };

  // Get pending and flagged news
  const getPendingAndFlaggedNews = (adminId) => {
    if (!isAdmin(adminId)) {
      return { success: false, message: "Unauthorized: Admin role required." };
    }
    const pendingAndFlagged = newsContent.filter((n) => n.status === "pending" || n.status === "flagged");
    return {
      success: true,
      message: "Pending and flagged news articles retrieved.",
      news: pendingAndFlagged,
    };
  };

  // News Submission Form component
  function NewsSubmissionForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [source, setSource] = useState("User Submission");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const result = submitNews(currentUser, title, body, source);
      setMessage(result.message);
      if (result.success) {
        setTitle("");
        setBody("");
        setSource("User Submission");
      }
    };

    return (
      <div className="p-4 bg-white rounded shadow-md m-4">
        <h2 className="text-xl font-bold mb-4">Submit News Article</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
        </div>
      </div>
    );
  }

  // Admin Dashboard component
  function AdminDashboard() {
    const pendingAndFlagged = getPendingAndFlaggedNews(currentUser);
    const [reviewNewsId, setReviewNewsId] = useState(null);
    const [reviewDetails, setReviewDetails] = useState(null);
    const [message, setMessage] = useState("");

    const handleReview = (newsId) => {
      const result = reviewNews(currentUser, newsId);
      setMessage(result.message);
      if (result.success) {
        setReviewNewsId(newsId);
        setReviewDetails(result.news);
      }
    };

    const handleApprove = (newsId) => {
      const result = confirmNews(currentUser, newsId);
      setMessage(result.message);
      if (result.success) {
        setReviewNewsId(null);
        setReviewDetails(null);
      }
    };

    const handleDelete = (newsId) => {
      const result = deleteNews(currentUser, newsId);
      setMessage(result.message);
      if (result.success) {
        setReviewNewsId(null);
        setReviewDetails(null);
      }
    };

    if (!isAdmin(currentUser)) {
      return <p className="p-4 text-red-500">Unauthorized: Admin role required.</p>;
    }

    return (
      <div className="p-4 bg-white rounded shadow-md m-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard - Pending & Flagged Articles</h2>
        {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
        {pendingAndFlagged.success ? (
          <ul className="space-y-2">
            {pendingAndFlagged.news.map((news) => (
              <li key={news.id} className="p-2 border rounded">
                <p><strong>Title:</strong> {news.title}</p>
                <p><strong>Status:</strong> {news.status}</p>
                {news.flagReason && <p><strong>Flag Reason:</strong> {news.flagReason}</p>}
                <p><strong>Source:</strong> {news.source}</p>
                <button
                  onClick={() => handleReview(news.id)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Review
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>{pendingAndFlagged.message}</p>
        )}
        {reviewDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-bold">Review: {reviewDetails.title}</h3>
            <p><strong>Body:</strong> {reviewDetails.body}</p>
            <p><strong>Author:</strong> {reviewDetails.author}</p>
            <p><strong>Source:</strong> {reviewDetails.source}</p>
            {reviewDetails.flagReason && <p><strong>Flag Reason:</strong> {reviewDetails.flagReason}</p>}
            <button
              onClick={() => handleApprove(reviewDetails.id)}
              className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleDelete(reviewDetails.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }

  // News List component for users to view and flag articles
  function NewsList() {
    const approvedNews = newsContent.filter((n) => n.status === "approved");
    const [flagNewsId, setFlagNewsId] = useState(null);
    const [flagReason, setFlagReason] = useState("");
    const [message, setMessage] = useState("");

    const handleFlag = (newsId) => {
      if (!flagReason) {
        setMessage("Flag reason is required.");
        return;
      }
      const result = flagNews(currentUser, newsId, flagReason);
      setMessage(result.message);
      if (result.success) {
        setFlagNewsId(null);
        setFlagReason("");
      }
    };

    return (
      <div className="p-4 bg-white rounded shadow-md m-4">
        <h2 className="text-xl font-bold mb-4">Published News Articles</h2>
        {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
        <ul className="space-y-2">
          {approvedNews.map((news) => (
            <li key={news.id} className="p-2 border rounded">
              <p><strong>Title:</strong> {news.title}</p>
              <p><strong>Body:</strong> {news.body}</p>
              <p><strong>Source:</strong> {news.source}</p>
              <button
                onClick={() => setFlagNewsId(news.id)}
                className="bg-orange-500 text-white p-1 rounded hover:bg-orange-600"
              >
                Flag
              </button>
              {flagNewsId === news.id && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    placeholder="Reason for flagging"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    onClick={() => handleFlag(news.id)}
                    className="bg-red-500 text-white p-2 rounded mr-2 hover:bg-red-600"
                  >
                    Submit Flag
                  </button>
                  <button
                    onClick={() => setFlagNewsId(null)}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">News Aggregation - Content Moderation</h1>
      <div className="mb-4">
        <label className="mr-2">Switch User:</label>
        <select
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          className="p-2 border rounded"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.role})
            </option>
          ))}
        </select>
      </div>
      <NewsSubmissionForm />
      <NewsList />
      {isAdmin(currentUser) && <AdminDashboard />}
    </div>
  );
}

export default ContentModeration;