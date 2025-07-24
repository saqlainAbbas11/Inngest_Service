const { inngest } = require("./client");
const Habit = require("../models/Habit");

// Every minute cron job (to see the function trigger every minute)
const agentFunction = inngest.createFunction(
  { id: "habit-agent", name: "Habit Agent Checker" },
  { cron: "*/1 * * * *" },  // Every minute
  async () => {
    console.log("🧠 Agent checking habits...");

    const habits = await Habit.find();
    const now = new Date();
    const reminders = [];

    for (const habit of habits) {
      if (!habit.logs || habit.logs.length === 0) {
        reminders.push({ habit, reason: "Never started" });
        continue;
      }

      const lastLog = new Date(habit.logs[habit.logs.length - 1]);
      const diff = (now - lastLog) / (1000 * 60 * 60); // in hours

      if (diff > 24) {
        reminders.push({ habit, reason: `Last log was ${Math.floor(diff)} hours ago` });
      }
    }

    for (const { habit, reason } of reminders) {
      console.log(`🔔 Sending reminder for habit "${habit.name}" (reason: ${reason})`);
      await inngest.send({
        name: "habit/reminder",
        data: {
          userId: habit.userId.toString(),
          habitName: habit.name,
          reason,
        },
      });
    }

    return { count: reminders.length };
  }
);

module.exports = { agentFunction };
