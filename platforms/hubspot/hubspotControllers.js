const { processIncomingData, sendOutgoingData } = require("./hubspotServices");

exports.handleWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log("Incoming hubspotServices Webhook Data:", data);

    await processIncomingData(data);
    res.status(200).send({ status: "success", message: "Webhook processed" });
  } catch (error) {
    console.error("Error processing hubspotServices webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};

exports.sendWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log("Outgoing hubspotServices Webhook Payload:", payload);

    await sendOutgoingData(payload);
    res.status(200).send({ status: "success", message: "Webhook sent" });
  } catch (error) {
    console.error("Error sending Docebo webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};
