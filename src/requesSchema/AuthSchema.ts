import Joi from "joi";

interface TypeSchema {
  signUp: Joi.Schema;
  login: Joi.Schema;
  verify: Joi.Schema;
}

const schema: TypeSchema = {
  signUp: Joi.object().keys({
    body: Joi.object()
      .keys({
        username: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        confirmPassword: Joi.ref("password"),
      })
      .required(),
  }),
  login: Joi.object().keys({
    body: Joi.object()
      .keys({
        username: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().required(),
      })
      .or("username", "email"),
  }),
  verify: Joi.object().keys({
    query: Joi.object()
      .keys({
        code: Joi.string().required(),
      })
  }),
};

export default schema;
