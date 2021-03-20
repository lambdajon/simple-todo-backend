import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'
import swagger from './swagger/index'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
require('dotenv').config()
import cors from 'cors'
dotenv.config()

const app = express()

app.use(cors())
// if (process.env.NODE_ENV == 'prod') {
// }
app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', swagger)
app.use(routes)
app.get('/status', (req: Request, res: Response) => {
  res.json({
    stauts: 'OK',
  })
})

// app.use(rootRoute)
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).send({ error: 'Internal server error', ...err })
// })

export default app
