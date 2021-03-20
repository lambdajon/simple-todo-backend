import Joi from 'joi'

interface TypeSchema {
  create: Joi.Schema<any>
  update: Joi.Schema<any>
  get: Joi.Schema<any>
  delete: Joi.Schema<any>
}

const schema: TypeSchema = {
  create: Joi.object().keys({
    body: Joi.object()
      .keys({
        name: Joi.string(),
      })
      .required(),
  }),
  update: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string(),
      })
      .required(),
  }),
  get: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  delete: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
}

export default schema
