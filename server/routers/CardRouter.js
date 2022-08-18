const express = require("express");
const router = express.Router();

const {
  updateTemporaryCard,
  getTemporaryCard,
  removeCardConnection,
  pairCardWithUser,
} = require("../controllers/CardController");

router.get("/update-temp", updateTemporaryCard);
router.get("/get-temp", getTemporaryCard);
router.delete("/remove", removeCardConnection);
router.post("/pair", pairCardWithUser);

module.exports = router;
