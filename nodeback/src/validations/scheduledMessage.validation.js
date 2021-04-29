const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createScheduledMessage = {
    body: Joi.object().keys({
        groupname: Joi.string().required(),
        subject: Joi.string().required(),
        content: Joi.string().required(),
        senddate: Joi.number().required(),
    })
}

const getScheduledMessages = {
    query: Joi.object().keys({
        groupname: Joi.string(),
        subject: Joi.string(),
        content: Joi.string(),
        senddate: Joi.number(),
    })
}

const getScheduledMessage = {
    params: Joi.object().keys({
      scheduledMessageId: Joi.string().custom(objectId),
    }),
  };
  
  const updateScheduledMessage = {
    params: Joi.object().keys({
        scheduledMessageId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        groupname: Joi.string(),
        content: Joi.string(),
        senddate: Joi.number(),
      })
      .min(1),
  };
  
  const deleteScheduledMessage = {
    params: Joi.object().keys({
        scheduledMessageId: Joi.string().custom(objectId),
    }),
  };

module.exports = {
    createScheduledMessage,
    getScheduledMessages,
    getScheduledMessage,
    updateScheduledMessage,
    deleteScheduledMessage,
};