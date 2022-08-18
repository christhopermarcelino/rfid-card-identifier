const express = require("express");
const router = express.Router();

const {
  getAllActivities,
  addNewAcivity,
  updateDataCache,
  resetActivities,
} = require("../controllers/ActivityController");

router.get("/", getAllActivities);
router.get("/add", addNewAcivity);
router.get("/update-cache", updateDataCache);
router.delete("/reset", resetActivities);

module.exports = router;
