import Joi from 'joi'

interface TypeSchema {
  get: Joi.Schema<any>
  create: Joi.Schema<any>
  update: Joi.Schema<any>
  delete: Joi.Schema<any>
}

const schema: TypeSchema = {
  get: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  create: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      groupId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  update: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string(),
        // group: Joi.string().required(),
      })
      .required(),
  }),
  delete: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
}

export default schema
