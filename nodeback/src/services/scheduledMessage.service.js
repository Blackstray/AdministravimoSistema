const httpStatus = require('http-status');
const { ScheduledMessage } = require('../models');
const ApiError = require('../utils/ApiError');

const createScheduledMessage = async (body) => {
    //optional add aditional validation later
    const scheduledMessage = await ScheduledMessage.create(body);
    return scheduledMessage;
};

const queryScheduledMessages = async (filter, options) => {
    const scheduledMessages = await ScheduledMessage.paginate(filter, options);
    return scheduledMessages;
};

const getScheduledMessageById = async (id) => {
    return ScheduledMessage.findById(id);
};

const updateScheduledMessageById = async (scheduledMessageId, updateBody) => {
    const scheduledMessage = await getScheduledMessageById(scheduledMessageId);
    if (!scheduledMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ScheduledMessage not found');
    }
    Object.assign(scheduledMessage, updateBody);
    await scheduledMessage.save();
    return scheduledMessage;
};

const deleteScheduledMessageById = async (scheduledMessageId) => {
    const scheduledMessage = await getScheduledMessageById(scheduledMessageId);
    if (!scheduledMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ScheduledMessage not found');
    }
    await scheduledMessage.remove();
    return scheduledMessage;
  };

module.exports = {
    createScheduledMessage,
    queryScheduledMessages,
    getScheduledMessageById,
    updateScheduledMessageById,
    deleteScheduledMessageById,
}