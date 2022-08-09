const express = require("express");
const router = express.Router();

const { signin } = require("../controllers/AuthController");

router.post("/signin", signin);

module.exports = router;
