import { Source } from "../Models/source.model.js";

// ✅ Get all sources
export const getSources = async (req, res) => {
  try {
    const sources = await Source.find().sort({ createdAt: -1 });
    res.json(sources);
  } catch (err) {
    console.error("getSources error:", err);
    res.status(500).json({ message: "Failed to fetch sources" });
  }
};

// ✅ Add a new source
export const addSource = async (req, res) => {
  try {
    const { name, url, category, reliabilityScore, factCheckAccuracy, description } = req.body;

    const newSource = new Source({
      name,
      url,
      category,
      reliabilityScore,
      factCheckAccuracy,
      description,
    });

    await newSource.save();
    res.status(201).json(newSource);
  } catch (err) {
    console.error("addSource error:", err);
    res.status(400).json({ message: "Failed to add source", error: err.message });
  }
};

// ✅ Get single source by ID
export const getSource = async (req, res) => {
  try {
    const { id } = req.params;
    const source = await Source.findById(id);

    if (!source) {
      return res.status(404).json({ message: "Source not found" });
    }

    res.json(source);
  } catch (err) {
    console.error("getSource error:", err);
    res.status(500).json({ message: "Failed to get source", error: err.message });
  }
};

// ✅ Update source
export const updateSource = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Source.findByIdAndUpdate(id, req.body, {
      new: true,        // updated document return karega
      runValidators: true, // schema validations chalega
    });

    if (!updated) {
      return res.status(404).json({ message: "Source not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateSource error:", err);
    res.status(400).json({ message: "Failed to update source", error: err.message });
  }
};

// ✅ Delete source
export const deleteSource = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Source.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Source not found" });
    }

    res.json({ message: "Source deleted successfully" });
  } catch (err) {
    console.error("deleteSource error:", err);
    res.status(500).json({ message: "Failed to delete source", error: err.message });
  }
};
