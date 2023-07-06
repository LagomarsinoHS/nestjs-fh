import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_DB: Joi.required(),
  ENVIRONMENT: Joi.string().default('dev'),
});
