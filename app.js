const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const doceboRoutes = require("./platforms/docebo/doceboRoutes");
const salesforceRoutes = require("./platforms/salesforce/salesforceRoutes");
const hubspotRoutes = require("./platforms/hubspot/hubspotRoutes");
const doceBoContacts = require("./platforms/docebo/cron/contact");
const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/webhook/docebo", doceboRoutes);
app.use("/webhook/salesforce", salesforceRoutes);
app.use("/webhook/hubspot", hubspotRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

( async() => {
  doceBoContacts.getPendingUsers();
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

