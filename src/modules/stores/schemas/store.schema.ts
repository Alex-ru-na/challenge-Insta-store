const Joi = require('joi');

const coordinatesSchema = Joi.array().items(
  Joi.number().min(-90).max(90),
  Joi.number().min(-180).max(180)
).length(2);

export const requestClosestStoreSchema = Joi.object({
  timezone: Joi.string().required(),
  coordinates: coordinatesSchema.required()
});

export const storeSchema = Joi.object({
  storeId: Joi.string().required(),
  storeName: Joi.string().required(),
  isOpen: Joi.boolean().required(),
  coordinates: Joi.object({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }).required(),
  openingHours: Joi.object({
    monday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    tuesday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    wednesday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    thursday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    friday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    saturday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    sunday: Joi.object({
      open: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
      close: Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required()
  }).required()
});
