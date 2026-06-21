const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", require("./routes/postRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
