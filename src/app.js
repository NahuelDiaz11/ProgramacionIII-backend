
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config.js'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger-output.json' assert { type: 'json' }

import userRoutes from './routes/user.routes.js'
import taskRoutes from './routes/task.routes.js'


const app = express()

app.set("port", config.port)

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api',userRoutes)
app.use('/api',taskRoutes)

var options = {
    explorer: true
  };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options))

export default app