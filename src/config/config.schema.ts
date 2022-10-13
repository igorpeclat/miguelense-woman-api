import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  APP_PORT: Joi.number().default(3000).required(),
  APP_GLOBAL_PREFIX: Joi.string().default("courses"),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP_H: Joi.string().default("3600s"),
  JWT_EXP_D: Joi.string().default("1d"),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required()
});
