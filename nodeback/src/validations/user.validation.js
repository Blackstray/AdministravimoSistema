const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userName: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.string().required(),
    mac: Joi.string().required(),
    subscription: Joi.string().required(),
    price: Joi.number().required(),
    subscriptionEnd: Joi.number().required(),
    comment: Joi.string(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    userName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      userName: Joi.string(),
      firstname: Joi.string(),
      lastname: Joi.string(),
      address: Joi.string(),
      mac: Joi.string(),
      subscription: Joi.string(),
      price: Joi.number(),
      subscriptionEnd: Joi.number(),
      comment: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
