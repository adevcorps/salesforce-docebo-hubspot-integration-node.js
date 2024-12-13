const { processIncomingData, sendOutgoingData } = require("./doceboServices");
const contact = require("./cron/contact");
exports.handleWebhook = async (req, res) => {
  try {
    const data = req.body;
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
    // console.log("Outgoing Docebo Webhook Payload:", payload);

    await sendOutgoingData(payload);
    res.status(200).send({ status: "success", message: "Webhook sent" });
  } catch (error) {
    console.error("Error sending Docebo webhook:", error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
};

exports.newUserCreated = async (req, res) => {
    const payload = req.body;
    console.log("User Created:", payload);
    if(payload.event = 'user.created'){
      let userInfo = await contact.getUserInfo(payload.payload.user_id);
      console.log(userInfo);
    }
    res.status(200).send({ status: "success", message: "New user created" });
}

exports.userUpdated = async(req, res) => {
  const payload = req.body;
  console.log("User Updated:", payload);
  res.status(200).send({status: 'success'})
}
