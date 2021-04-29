const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessageGroup = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        members: Joi.array(),
    })
}

const getMessageGroups = {
    query: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
    })
}

const getMessageGroup = {
    params: Joi.object().keys({
      messageGroupId: Joi.string().custom(objectId),
    }),
  };
  
  const updateMessageGroup = {
    params: Joi.object().keys({
        messageGroupId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string(),
        description: Joi.string(),
        members: Joi.array(),
      })
      .min(1),
  };
  
  const deleteMessageGroup = {
    params: Joi.object().keys({
        messageGroupId: Joi.string().custom(objectId),
    }),
  };

module.exports = {
    createMessageGroup,
    getMessageGroups,
    getMessageGroup,
    updateMessageGroup,
    deleteMessageGroup,
};