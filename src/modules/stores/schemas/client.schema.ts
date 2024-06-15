import Joi from 'joi';

export const clientSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  timezone: Joi.string().required(),
  location: Joi.object({
    iso3_country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number().required(), Joi.number().required()).length(2).required()
  }).required()
});
