import Article from "../Models/Article.model.js";
import FactCheck from "../Models/FactCheck.js";
import User from "../Models/User.model.js";


// ======================= ARTICLE MANAGEMENT =======================

// Approve Article
export const approveArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to approve article", error: err.message });
  }
};

// Reject Article
export const rejectArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Article not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to reject article", error: err.message });
  }
};

// ======================= FACT CHECK MANAGEMENT =======================

// Approve FactCheck
export const approveFactCheck = async (req, res) => {
  try {
    const updated = await FactCheck.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Fact check not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to approve fact check", error: err.message });
  }
};

// Reject FactCheck
export const rejectFactCheck = async (req, res) => {
  try {
    const updated = await FactCheck.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Fact check not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to reject fact check", error: err.message });
  }
};

// ======================= USER MANAGEMENT =======================

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// Promote user → Admin
export const promoteToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User promoted to admin", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to promote user", error: err.message });
  }
};

// Demote Admin → User
export const demoteToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: "user" },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User demoted to normal", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to demote user", error: err.message });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};

