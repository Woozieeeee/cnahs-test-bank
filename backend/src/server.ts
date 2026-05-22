import app from "./app";

// Use the PORT provided by Render, or default to 5000 for local development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});