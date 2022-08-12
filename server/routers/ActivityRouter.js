const express = require("express");
const router = express.Router();

const { getAllActivities } = require("../controllers/ActivityController");

router.get("/", getAllActivities);

module.exports = router;
