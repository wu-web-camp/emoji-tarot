import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cards", cardsRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🃏 Emoji Tarot API running on http://localhost:${PORT}`);
});
