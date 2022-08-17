const express = require("express");
const router = express.Router();

const {
  getAllActivities,
  addNewAcivity,
} = require("../controllers/ActivityController");

router.get("/", getAllActivities);
router.get("/add", addNewAcivity);

module.exports = router;
