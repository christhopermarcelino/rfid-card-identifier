if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3001;

// Settings
app.use(express.json());
app.use(cors());

// Middlewares
const {
  devAuthenticate,
  authenticate,
} = require("./middlewares/AuthMiddleware");

// Router
const authRouter = require("./routers/AuthRouter");
const cardRouter = require("./routers/CardRouter");
const activityRouter = require("./routers/ActivityRouter");
const studentRouter = require("./routers/StudentRouter");

// Route
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/card", cardRouter);
app.use("/api/activities", authenticate, activityRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
