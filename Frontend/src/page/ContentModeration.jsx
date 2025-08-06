// contentModeration.js

// Simulated in-memory database for news content
const newsContent = [
  {
    id: 1,
    title: "Sample News Article",
    body: "This is a sample news article for aggregation.",
    author: "user1",
    status: "pending", // Possible statuses: pending, approved, deleted
    createdAt: new Date(),
    source: "User Submission", // Relevant for news aggregation
  },
];

// Simulated user database with roles
const users = [
  { id: "user1", username: "john_doe", role: "user" },
  { id: "admin1", username: "admin_user", role: "admin" },
];

// Function to check if a user is an admin
function isAdmin(userId) {
  const user = users.find((u) => u.id === userId);
  return user && user.role === "admin";
}

// Function to submit news content (by any user)
function submitNews(userId, title, body, source = "User Submission") {
  if (!title || !body) {
    return { success: false, message: "Title and body are required." };
  }
  const newNews = {
    id: newsContent.length + 1,
    title,
    body,
    author: userId,
    status: "pending",
    createdAt: new Date(),
    source,
  };
  newsContent.push(newNews);
  return { success: true, message: "News submitted for admin review.", news: newNews };
}

// Function for admin to review news content
function reviewNews(adminId, newsId) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  const news = newsContent.find((n) => n.id === newsId);
  if (!news) {
    return { success: false, message: "News article not found." };
  }
  return {
    success: true,
    message: "News details retrieved for review.",
    news,
  };
}

// Function for admin to approve news content
function confirmNews(adminId, newsId) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  const news = newsContent.find((n) => n.id === newsId);
  if (!news) {
    return { success: false, message: "News article not found." };
  }
  if (news.status !== "pending") {
    return { success: false, message: "News is not in pending state." };
  }
  news.status = "approved";
  return { success: true, message: "News approved for publication.", news };
}

// Function for admin to delete news content
function deleteNews(adminId, newsId) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  const newsIndex = newsContent.findIndex((n) => n.id === newsId);
  if (newsIndex === -1) {
    return { success: false, message: "News article not found." };
  }
  newsContent[newsIndex].status = "deleted";
  return { success: true, message: "News deleted.", news: newsContent[newsIndex] };
}

// Function to get all pending news for admin review
function getPendingNews(adminId) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  const pendingNews = newsContent.filter((n) => n.status === "pending");
  return {
    success: true,
    message: "Pending news articles retrieved.",
    news: pendingNews,
  };
}

// Example usage for testing
console.log(submitNews("user1", "Breaking News", "A major event occurred today.", "User Submission"));
console.log(reviewNews("admin1", 1));
console.log(confirmNews("admin1", 1));
console.log(deleteNews("admin1", 1));
console.log(getPendingNews("admin1"));
console.log(reviewNews("user1", 1)); // Should fail (not admin)

// Export functions for use in other modules
module.exports = {
  submitNews,
  reviewNews,
  confirmNews,
  deleteNews,
  getPendingNews,
  isAdmin,
};