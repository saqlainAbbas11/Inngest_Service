const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require("./routes/habitRoutes");

const { serve } = require("inngest/express");
const { inngest } = require("./inngest/client");
const { agentFunction } = require("./inngest/agent");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.use("/api/habits", habitRoutes);

// ✅ v3-compliant Inngest serve handler
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [agentFunction],
  })
);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
