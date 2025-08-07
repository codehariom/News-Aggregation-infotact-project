// sourceManagement.js

// Simulated in-memory database for news sources
const sources = [
  {
    id: 1,
    name: "Sample News Outlet",
    url: "https://samplenews.com",
    reliabilityScore: 85, // 0–100, higher is more reliable
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
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

// Function to validate reliability score (0–100)
function validateReliabilityScore(score) {
  return typeof score === "number" && score >= 0 && score <= 100;
}

// Function to add a new news source (admin-only)
function addSource(adminId, name, url, reliabilityScore) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  if (!name || !url || !validateReliabilityScore(reliabilityScore)) {
    return { success: false, message: "Name, URL, and valid reliability score (0–100) are required." };
  }
  const newSource = {
    id: sources.length + 1,
    name,
    url,
    reliabilityScore,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  sources.push(newSource);
  return { success: true, message: "News source added.", source: newSource };
}

// Function to update a news source (admin-only)
function updateSource(adminId, sourceId, updates) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  const source = sources.find((s) => s.id === sourceId && s.isActive);
  if (!source) {
    return { success: false, message: "Active news source not found." };
  }
  if (updates.name) source.name = updates.name;
  if (updates.url) source.url = updates.url;
  if (updates.reliabilityScore !== undefined) {
    if (!validateReliabilityScore(updates.reliabilityScore)) {
      return { success: false, message: "Invalid reliability score (must be 0–100)." };
    }
    source.reliabilityScore = updates.reliabilityScore;
  }
  source.updatedAt = new Date();
  return { success: true, message: "News source updated.", source };
}

// Function to delete a news source (admin-only, marks as inactive)
function deleteSource(adminId, sourceId) {
  if (!isAdmin(adminId)) {
    return { success: false, message: "Unauthorized: Admin role required." };
  }
  const source = sources.find((s) => s.id === sourceId && s.isActive);
  if (!source) {
    return { success: false, message: "Active news source not found." };
  }
  source.isActive = false;
  source.updatedAt = new Date();
  return { success: true, message: "News source deleted (marked inactive).", source };
}

// Function to retrieve a specific news source by ID
function getSource(sourceId) {
  const source = sources.find((s) => s.id === sourceId);
  if (!source) {
    return { success: false, message: "News source not found." };
  }
  return { success: true, message: "News source retrieved.", source };
}

// Function to retrieve all active news sources
function getAllSources() {
  const activeSources = sources.filter((s) => s.isActive);
  return {
    success: true,
    message: "Active news sources retrieved.",
    sources: activeSources,
  };
}

// Function to retrieve sources by minimum reliability score
function getSourcesByReliability(minScore) {
  if (!validateReliabilityScore(minScore)) {
    return { success: false, message: "Invalid reliability score (must be 0–100)." };
  }
  const filteredSources = sources.filter((s) => s.isActive && s.reliabilityScore >= minScore);
  return {
    success: true,
    message: `Active news sources with reliability score >= ${minScore} retrieved.`,
    sources: filteredSources,
  };
}

// Example usage for testing
console.log(addSource("admin1", "Global News", "https://globalnews.com", 90));
console.log(updateSource("admin1", 1, { reliabilityScore: 80, name: "Updated News Outlet" }));
console.log(deleteSource("admin1", 1));
console.log(getSource(1));
console.log(getAllSources());
console.log(getSourcesByReliability(85));
console.log(addSource("user1", "Test News", "https://testnews.com", 70)); // Should fail (not admin)

// Export functions for use in other modules
module.exports = {
  addSource,
  updateSource,
  deleteSource,
  getSource,
  getAllSources,
  getSourcesByReliability,
  isAdmin,
};