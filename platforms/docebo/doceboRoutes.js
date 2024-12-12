const express = require("express");
const { handleWebhook, sendWebhook, newUserCreated, mailVerificationPending } = require("./doceboControllers");

const router = express.Router();

router.post("/", handleWebhook); // Incoming webhook
router.post("/send", sendWebhook); // Outgoing webhook
router.post("/user/created", newUserCreated); // Outgoing webhook
router.post("/user/mail-pending", mailVerificationPending); // Outgoing webhook

module.exports = router;