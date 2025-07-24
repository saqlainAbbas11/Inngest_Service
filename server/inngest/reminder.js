const { inngest } = require('./client');

const reminderFunction = inngest.createFunction(
  { id: "habit-reminder", name: "Habit Reminder" },
  { event: "habit/reminder" },
  async ({ event }) => {
    const { userId, habitName } = event.data;
    console.log(`Send reminder to user ${userId} for habit ${habitName}`);
    return { success: true };
  }
);

module.exports = { reminderFunction };
