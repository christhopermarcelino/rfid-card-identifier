const express = require("express");
const router = express.Router();

const {
  getAllActivities,
  addNewAcivity,
  updateDataCache,
} = require("../controllers/ActivityController");

router.get("/", getAllActivities);
router.get("/add", addNewAcivity);
router.get("/update-cache", updateDataCache);

module.exports = router;
