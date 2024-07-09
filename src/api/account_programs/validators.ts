import { Joi, Segments } from "celebrate"

export const addProgramValidator = {
  [Segments.BODY]: Joi.object().keys({
    program_id: Joi.string().required(),
  }),
}
