const axios = require("axios");
const { DOCEBO_WEBHOOK_URL } = require("../../utils/config");

exports.processIncomingData = async (data) => {
  try {
    // Process incoming Docebo webhook data
    console.log("Processing Docebo webhook data:", data);
    // Add your business logic here
    return true;
  } catch (error) {
    throw new Error("Error processing Docebo webhook data: " + error.message);
  }
};

exports.sendOutgoingData = async (payload) => {
  try {
    console.log("Sending outgoing Docebo webhook:", payload);
    const response = await axios.post(DOCEBO_WEBHOOK_URL, payload);
    console.log("Docebo webhook response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error sending Docebo webhook: " + error.message);
  }
};
