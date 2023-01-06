/* eslint-disable quotes */
const Joi = require("joi");

const ActivitiesPayloadSchema = Joi.object({
  playlistId: Joi.string(),
  songId: Joi.string(),
  userId: Joi.string(),
  action: Joi.string(),
  time: Joi.string(),
});

module.exports = { ActivitiesPayloadSchema };
