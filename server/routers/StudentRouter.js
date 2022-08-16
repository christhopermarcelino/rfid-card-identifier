const express = require("express");
const router = express.Router();

const {
  getAllAvailableStudents,
  getAllStudentsAndCards,
} = require("../controllers/StudentController");

router.get("/available", getAllAvailableStudents);
router.get("/all-pair", getAllStudentsAndCards);

module.exports = router;
