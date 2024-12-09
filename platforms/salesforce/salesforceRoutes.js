const express = require("express");
const { handleWebhook, sendWebhook } = require("./salesforceControllers");

const router = express.Router();

router.post("/", handleWebhook); // Incoming webhook
router.post("/send", sendWebhook); // Outgoing webhook

module.exports = router;
