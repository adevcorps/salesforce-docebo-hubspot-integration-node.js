axios = require("axios");
const { SALESFORCE_WEBHOOK_URL } = require("../../utils/config");

exports.processIncomingData = async (data) => {
  try {
    console.log("Processing hubSpot webhook data:", data);
    // Add Salesforce-specific logic here
    return true;
  } catch (error) {
    throw new Error("Error processing Salesforce webhook data: " + error.message);
  }
};

exports.sendOutgoingData = async (payload) => {
  try {
    console.log("Sending outgoing hubSpot webhook:", payload);
    const response = await axios.post(SALESFORCE_WEBHOOK_URL, payload);
    console.log("hubSpot webhook response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error sending hubSpot webhook: " + error.message);
  }
};
