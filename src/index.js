import express from 'express'
import morgan from 'morgan'
import serveStatic from 'serve-static'
import path from 'path'
import bodyParser from 'body-parser'
import { Settings } from 'luxon'
import cors from 'cors'

import apiRoute from './route/api'
import connectMongo from './model/mongo'

Settings.defaultZoneName = 'Asia/Bangkok'

connectMongo()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(serveStatic(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true,
  setHeaders: (res, path, stat) => {
    res.set('x-timestamp', Date.now())
  }
}))

apiRoute(app)

export default app
