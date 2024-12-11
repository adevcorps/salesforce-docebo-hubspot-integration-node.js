const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

require("dotenv").config();
const doceboRoutes = require("./platforms/docebo/doceboRoutes");
const salesforceRoutes = require("./platforms/salesforce/salesforceRoutes");
const hubspotRoutes = require("./platforms/hubspot/hubspotRoutes");
const accessTokenManager = require("./common/accessToken");

const app = express();
const PORT = process.env.PORT || 5000;

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

let data = qs.stringify({
  'Content-Type': 'application/json',
  'client_id': 'y-dev',
  'client_secret': 'a09c3280830d2959bbb04ec5a1bc64bd21d03e5f66aeff2d8b928c78218ce676',
  'grant_type': 'client_credentials',
  'scope': 'api' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://strivetogethersandbox.docebosaas.com/oauth2/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
  },
  data : data
};


app.listen(PORT, () => {
  accessTokenManager.startTokenRefresh();
  console.log(`Server is running on http://localhost:${PORT}`);
});