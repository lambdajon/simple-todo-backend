import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

const router = Router()
const port = process.env.PORT || 4000
const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [
      {
        url: 'http://localhost:{port}',
        description: 'Todo local server',
        variables: {
          port: {
            enum: [port],
            default: port,
          },
        },
      },
    ],
    info: {
      version: '1',
      title: 'Todo REST API',
      description: 'Todo API Information',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Please use login api to get accessToken',
        },
      },
    },
  },
  apis: [
    `${__dirname}/components/*.yaml`,
    `${__dirname}/docs/**/components.yaml`,
    `${__dirname}/docs/**/*.yaml`,
  ],
})
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default router