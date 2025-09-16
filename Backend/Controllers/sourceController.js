import { Source } from "../Models/source.model.js";


// ✅ Add new source
export const addSource = async (req, res) => {
  try {
    const { name, url, category, reliabilityScore, factCheckAccuracy, description } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: "Name and URL required" });
    }

    // Duplicate check
    const existing = await Source.findOne({ $or: [{ name }, { url }] });
    if (existing) {
      return res.status(400).json({ message: "Source with same name or URL already exists" });
    }

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
    res.status(500).json({ message: "Failed to add source", error: err.message });
  }
};

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


// ✅ Delete source by ID
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

// ✅ UPDATE /api/sources/:id
export const updateSource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedSource = await Source.findByIdAndUpdate(id, updates, {
      new: true,        // updated document return karega
      runValidators: true, // schema validations apply honge
    });

    if (!updatedSource) {
      return res.status(404).json({ message: "Source not found" });
    }

    res.json(updatedSource);
  } catch (err) {
    console.error("updateSource error:", err);
    res.status(500).json({ message: "Failed to update source", error: err.message });
  }
};

