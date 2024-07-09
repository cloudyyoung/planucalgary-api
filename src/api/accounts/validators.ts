import { Joi, Segments } from "celebrate"

export const signInValidator = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

export const signUpValidator = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}
