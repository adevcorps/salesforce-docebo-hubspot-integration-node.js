const express = require("express");
const { handleWebhook, sendWebhook, newUserCreated, userUpdated } = require("./doceboControllers");

const router = express.Router();

router.post("/", handleWebhook); // Incoming webhook
router.post("/send", sendWebhook); // Outgoing webhook
router.post("/user/created", newUserCreated); // Outgoing webhook
router.post("/user/updated", userUpdated); // Outgoing webhook

module.exports = router;