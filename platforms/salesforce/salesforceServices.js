axios = require("axios");
const { SALESFORCE_WEBHOOK_URL } = require("../../utils/config");

exports.processIncomingData = async (data) => {
  try {
    console.log("Processing Salesforce webhook data:", data);
    // Add Salesforce-specific logic here
    return true;
  } catch (error) {
    throw new Error("Error processing Salesforce webhook data: " + error.message);
  }
};

exports.sendOutgoingData = async (payload) => {
  try {
    console.log("Sending outgoing Salesforce webhook:", payload);
    const response = await axios.post(HUBSPOT_WEBHOOK_URL, payload);
    console.log("Salesforce webhook response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error sending Salesforce webhook: " + error.message);
  }
};
