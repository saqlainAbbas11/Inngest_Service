const { serve } = require("inngest/express");
const { inngest } = require("./client");
const { reminderFunction } = require("./reminder");
const { agentFunction } = require("./agent");

module.exports = serve({
  client: inngest,
  functions: [reminderFunction, agentFunction], // ✅ important
});
