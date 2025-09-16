import express from "express";


import {
  getSources,
  addSource,
  getSource,      // ← add this
  updateSource,
  deleteSource,
} from "../Controllers/sourceController.js";

const router = express.Router();

// list
router.get("/", getSources);

// create
router.post("/", addSource);

// single source (must be BEFORE routes that use :id with different path)
router.get("/:id", getSource);

// update
router.put("/:id", updateSource);

// delete
router.delete("/:id", deleteSource);


export default router;
