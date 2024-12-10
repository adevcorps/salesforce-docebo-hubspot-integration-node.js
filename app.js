const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
const doceboRoutes = require("./platforms/docebo/doceboRoutes");
const salesforceRoutes = require("./platforms/salesforce/salesforceRoutes");
const hubspotRoutes = require("./platforms/hubspot/hubspotRoutes");
// const ngrok = require('ngrok');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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

// const options = {
//   key: fs.readFileSync("./public/cert/server.key"),
//   cert: fs.readFileSync("./public/cert/server.cert"),
// };

// https.createServer(options, app)
//      .listen(5000, function(req, res){
//       console.log("Server started at port 5000")
//      });