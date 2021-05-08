const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { scheduledMessageService, emailService } = require('../services');

const createScheduledMessage = catchAsync(async (req, res) => {
    const scheduledMessage = await scheduledMessageService.createScheduledMessage(req.body);
    res.status(httpStatus.CREATED).send(scheduledMessage);
});

const getScheduledMessages = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['groupname']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await scheduledMessageService.queryScheduledMessages(filter, options);
    res.send(result);
});

const getScheduledMessage = catchAsync(async (req, res) => {
    const scheduledMessage = await scheduledMessageService.getScheduledMessageById(req.params.scheduledMessageId);
    if (!scheduledMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ScheduledMessage not found');
    }
    res.send(scheduledMessage);
});
  
const updateScheduledMessage = catchAsync(async (req, res) => {
    const scheduledMessage = await scheduledMessageService.updateScheduledMessageById(req.params.scheduledMessageId, req.body);
    res.send(scheduledMessage);
});
  
const deleteScheduledMessage = catchAsync(async (req, res) => {
    await scheduledMessageService.deleteScheduledMessageById(req.params.scheduledMessageId);
    res.status(httpStatus.NO_CONTENT).send();
});

const sendScheduledMessages = async (req, res) => {
    await emailService.sendEmail();
    res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
    createScheduledMessage,
    getScheduledMessages,
    getScheduledMessage,
    updateScheduledMessage,
    deleteScheduledMessage,
    sendScheduledMessages,
}