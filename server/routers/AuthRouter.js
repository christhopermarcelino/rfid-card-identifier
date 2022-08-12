const express = require("express");
const router = express.Router();

const { signin, getUserInfo } = require("../controllers/AuthController");
const { authenticate } = require("../middlewares/AuthMiddleware");

router.post("/signin", signin);
router.post("/get-user-info", authenticate, getUserInfo);

module.exports = router;
