import { Segments, Joi } from "celebrate"

export const addCourseValidator = {
  [Segments.BODY]: Joi.object().keys({
    course_id: Joi.string().required(),
  }),
}
