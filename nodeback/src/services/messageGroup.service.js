const httpStatus = require('http-status');
const { MessageGroup } = require('../models');
const ApiError = require('../utils/ApiError');

const createMessageGroup = async (body) => {
    //optional add aditional validation later
    const messageGroup = await MessageGroup.create(body);
    return messageGroup;
};

const queryMessageGroups = async (filter, options) => {
    const messageGroups = await MessageGroup.paginate(filter, options);
    return messageGroups;
};

const getMessageGroupById = async (id) => {
    return MessageGroup.findById(id);
};

const updateMessageGroupById = async (messageGroupId, updateBody) => {
    const messageGroup = await getMessageGroupById(messageGroupId);
    if (!messageGroup) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MessageGroup not found');
    }
    Object.assign(messageGroup, updateBody);
    await messageGroup.save();
    return messageGroup;
};

const deleteMessageGroupById = async (messageGroupId) => {
    const messageGroup = await getMessageGroupById(messageGroupId);
    if (!messageGroup) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MessageGroup not found');
    }
    await messageGroup.remove();
    return messageGroup;
  };

module.exports = {
    createMessageGroup,
    queryMessageGroups,
    getMessageGroupById,
    updateMessageGroupById,
    deleteMessageGroupById,
}