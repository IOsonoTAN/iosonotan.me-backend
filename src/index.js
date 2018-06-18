import express from 'express'
import morgan from 'morgan'
import serveStatic from 'serve-static'
import path from 'path'
import bodyParser from 'body-parser'

import apiRoute from './route/api'
import connectMongo from './model/mongo'

connectMongo()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(serveStatic(path.join(__dirname, 'public'), {
  maxAge: '1d'
}))

apiRoute(app)

export default app
