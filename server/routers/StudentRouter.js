const express = require("express");
const router = express.Router();

const { getAllAvailableStudents } = require("../controllers/StudentController");

router.get("/available", getAllAvailableStudents);

module.exports = router;
