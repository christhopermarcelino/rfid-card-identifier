if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

// Settings
app.use(express.json());

// Router
const authRouter = require("./routers/AuthRouter");

// Route
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
  });
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
