const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const doceboRoutes = require("./platforms/docebo/doceboRoutes");
const salesforceRoutes = require("./platforms/salesforce/salesforceRoutes");
const hubspotRoutes = require("./platforms/hubspot/hubspotRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Platform-Specific Routes
app.use("/webhook/docebo", doceboRoutes);
app.use("/webhook/salesforce", salesforceRoutes);
app.use("/webhook/hubspot", hubspotRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});