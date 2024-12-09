const express = require("express");
const { handleWebhook, sendWebhook, newUserCreated } = require("./doceboControllers");

const router = express.Router();

router.post("/", handleWebhook); // Incoming webhook
router.post("/send", sendWebhook); // Outgoing webhook
router.post("/user/created", newUserCreated); // Outgoing webhook

module.exports = router;