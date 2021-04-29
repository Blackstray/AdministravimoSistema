const express = require('express');
const validate = require('../../middlewares/validate');
const messageGroupValidation = require('../../validations/messageGroup.validation');
const messageGroupsController = require("../../controllers/messageGroup.controller");

const router = express.Router();

router
    .route('/')
    .post(validate(messageGroupValidation.createMessageGroup), messageGroupsController.createMessageGroup)
    .get(validate(messageGroupValidation.getMessageGroups), messageGroupsController.getMessageGroups);

router
    .route('/:messageGroupId')
    .get(validate(messageGroupValidation.getMessageGroup), messageGroupsController.getMessageGroup)
    .patch(validate(messageGroupValidation.updateMessageGroup), messageGroupsController.updateMessageGroup)
    .delete(validate(messageGroupValidation.deleteMessageGroup), messageGroupsController.deleteMessageGroup);

module.exports = router;