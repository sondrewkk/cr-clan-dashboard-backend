const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

const verifyValidation = (data) => {
  const schema = {
    id: Joi.string().required(),
    tag: Joi.string().required(),
  };

  return Joi.validate(data, schema);
};

const createClanValidation = (data) => {
  const schema = {
    tag: Joi.string().required(),
    creator: Joi.string().required(),
  };

  return Joi.validate(data, schema);
};

module.exports = {
  registerValidation,
  loginValidation,
  verifyValidation,
  createClanValidation,
};

