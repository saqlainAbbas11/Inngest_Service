const Habit = require("../models/Habit");
const { inngest } = require("../inngest/client");

// Fake user ID for now
const USER_ID = "123456789";

exports.createHabit = async (req, res) => {
  try {
    console.log("📥 Incoming habit data:", req.body);

    const habit = new Habit({
      userId: USER_ID,
      name: req.body.name, // this might be undefined!
      logs: [],
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    console.error("❌ Error in createHabit:", err);
    res.status(500).json({ error: "Failed to create habit" });
  }
};

exports.logHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });

    habit.logs.push(new Date());
    await habit.save();

    // Optional: Trigger a success event (or streak logic later)
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: "Failed to log habit" });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: USER_ID });
    res.json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);  // Add this
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};
