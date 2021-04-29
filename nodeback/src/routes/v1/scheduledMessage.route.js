const express = require('express');
const validate = require('../../middlewares/validate');
const scheduledMessageValidation = require('../../validations/scheduledMessage.validation');
const scheduledMessagesController = require("../../controllers/scheduledMessage.controller");

const router = express.Router();

router
    .route('/')
    .post(validate(scheduledMessageValidation.createMessageGroup), scheduledMessagesController.createScheduledMessage)
    .get(validate(scheduledMessageValidation.getMessageGroups), scheduledMessagesController.getScheduledMessages);

router
    .route('/:scheduledMessageId')
    .get(validate(scheduledMessageValidation.getMessageGroup), scheduledMessagesController.getScheduledMessage)
    .patch(validate(scheduledMessageValidation.updateMessageGroup), scheduledMessagesController.updateScheduledMessage)
    .delete(validate(scheduledMessageValidation.deleteMessageGroup), scheduledMessagesController.deleteScheduledMessage);

module.exports = router;