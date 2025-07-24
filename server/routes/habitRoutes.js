const express = require("express");
const router = express.Router();
const {
  createHabit,
  logHabit,
  getHabits,
} = require("../controllers/habitController");

router.post("/", createHabit);         // POST /api/habits
router.post("/:id/log", logHabit);     // POST /api/habits/:id/log
router.get("/", getHabits);            // GET /api/habits

module.exports = router;
