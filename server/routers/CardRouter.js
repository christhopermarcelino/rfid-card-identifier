const express = require("express");
const router = express.Router();

const {
  updateTemporaryCard,
  getTemporaryCard,
  insertNewCard,
  pairCardWithUser,
} = require("../controllers/CardController");

router.patch("/temp", updateTemporaryCard);
router.get("/temp", getTemporaryCard);
router.post("/insert", insertNewCard);
router.post("/pair", pairCardWithUser);

module.exports = router;