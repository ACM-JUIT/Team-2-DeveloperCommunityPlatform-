import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 DevConnect Backend Running");
});

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

export default app;