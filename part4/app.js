const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middlewares')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config()

const mongoUrl = process.env.MONGO_DB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
   console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.notFound)
app.use(middleware.handleErrors)

module.exports = app 