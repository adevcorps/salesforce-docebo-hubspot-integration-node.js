require("dotenv").config();

module.exports = {
  DOCEBO_WEBHOOK_URL: process.env.DOCEBO_WEBHOOK_URL,
  SALESFORCE_WEBHOOK_URL: process.env.SALESFORCE_WEBHOOK_URL,
  HUBSPOT_WEBHOOK_URL: process.env.HUBSPOT_WEBHOOK_URL,
};