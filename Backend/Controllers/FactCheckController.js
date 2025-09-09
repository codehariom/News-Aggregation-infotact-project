import FactCheck from "../models/FactCheck.js";

// ✅ GET /api/fact-checking
export const getFactChecks = async (req, res) => {
  try {
    const factChecks = await FactCheck.find().sort({ createdAt: -1 });
    res.json(factChecks);
  } catch (err) {
    console.error("getFactChecks error:", err);
    res.status(500).json({ message: "Failed to fetch fact-checks" });
  }
};

// ✅ POST /api/submit-facts
export const submitFacts = async (req, res) => {
  try {
    const { article, sourceDomain, claims, confidence, notes } = req.body;

    if (!claims || !Array.isArray(claims) || claims.length === 0) {
      return res.status(400).json({ message: "At least one claim is required" });
    }

    const newFactCheck = new FactCheck({
      article,
      sourceDomain,
      claims,
      confidence,
      notes,
      status: "pending",
    });

    await newFactCheck.save();
    res.status(201).json(newFactCheck);
  } catch (err) {
    console.error("submitFacts error:", err);
    res.status(400).json({ message: "Failed to submit fact-check" });
  }
};
