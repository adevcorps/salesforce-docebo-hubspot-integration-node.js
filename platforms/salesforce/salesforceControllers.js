const { processIncomingData, sendOutgoingData } = require("./salesforceServices");

exports.handleWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log("Incoming salesforceServices Webhook Data:", data);

    await processIncomingData(data);
    res.status(200).send({ status: "success", message: "Webhook processed" });
  } catch (error) {
    console.error("Error processing salesforceServices webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};

exports.sendWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log("Outgoing salesforceServices Webhook Payload:", payload);

    await sendOutgoingData(payload);
    res.status(200).send({ status: "success", message: "Webhook sent" });
  } catch (error) {
    console.error("Error sending Docebo webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};
