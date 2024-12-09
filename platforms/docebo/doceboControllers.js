const { processIncomingData, sendOutgoingData } = require("./doceboServices");

exports.handleWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log("Incoming Docebo Webhook Data:", data);

    await processIncomingData(data);
    res.status(200).send({ status: "success", message: "Webhook processed" });
  } catch (error) {
    console.error("Error processing Docebo webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};

exports.sendWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log("Outgoing Docebo Webhook Payload:", payload);

    await sendOutgoingData(payload);
    res.status(200).send({ status: "success", message: "Webhook sent" });
  } catch (error) {
    console.error("Error sending Docebo webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};

exports.newUserCreated = async (req, res) => {
  try {
    const payload = req.body;
    console.log("New User Created in Docebo:", payload);

    // await sendOutgoingData(payload);
    res.status(200).send({ status: "success", message: "New user created" });
  } catch (error) {
    console.error("Error sending Docebo webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
}
