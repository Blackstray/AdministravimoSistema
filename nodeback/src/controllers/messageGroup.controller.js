const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { messageGroupService } = require('../services');

const createMessageGroup = catchAsync(async (req, res) => {
    const messageGroup = await messageGroupService.createMessageGroup(req.body);
    res.status(httpStatus.CREATED).send(messageGroup);
});

const getMessageGroups = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await messageGroupService.queryMessageGroups(filter, options);
    res.send(result);
});

const getMessageGroup = catchAsync(async (req, res) => {
    const messageGroup = await messageGroupService.getMessageGroupById(req.params.messageGroupId);
    if (!messageGroup) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MessageGroup not found');
    }
    res.send(messageGroup);
});
  
const updateMessageGroup = catchAsync(async (req, res) => {
    const messageGroup = await messageGroupService.updateMessageGroupById(req.params.messageGroupId, req.body);
    res.send(messageGroup);
});
  
const deleteMessageGroup = catchAsync(async (req, res) => {
    await messageGroupService.deleteMessageGroupById(req.params.messageGroupId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createMessageGroup,
    getMessageGroups,
    getMessageGroup,
    updateMessageGroup,
    deleteMessageGroup,
}