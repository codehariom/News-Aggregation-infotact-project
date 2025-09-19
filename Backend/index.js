// Backend/index.js
import express from "express";
import connectDb from "./Database/database.js";
import dotenv from "dotenv";
import cors from "cors";

// ✅ Routes import
import sourceRoutes from "./Routes/sourceRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import adminUserRoutes from "./Routes/adminUserRoutes.js";
import authRoutes from "./Routes/authRoutes.js"; 
import myContribRoutes from "./Routes/MyContribution.js";
import factCheckRoutes from "./Routes/FactCheckRoute.js";
import articleRoutes from "./Routes/articleRoutes.js";

// express app 
const app = express();

// config env
dotenv.config();

// config cors 
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors "));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware 
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

// ✅ Routes
app.use("/api/auth", authRoutes);                 // Auth routes
app.use("/api/my-contributions", myContribRoutes);
app.use("/api/fact-checking", factCheckRoutes);   // renamed for clarity
app.use("/api/sources", sourceRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", adminUserRoutes);

// ports
const port = process.env.PORT || 8000;

// ✅ CONNECT DB & START SERVER
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect db", error);
  });
