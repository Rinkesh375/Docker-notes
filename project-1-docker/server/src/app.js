import express from "express";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully! at port 800000");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
