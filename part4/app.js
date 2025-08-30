const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middlewares')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
require('dotenv').config()

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV }= process.env

const connectionString = NODE_ENV === 'test' 
? MONGO_DB_URI_TEST
: MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log(`connected to MongoDB ${NODE_ENV === 'test' ? "test" : "normal"}`)
    console.log()
  })
  .catch((error) => {
   console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.notFound)
app.use(middleware.handleErrors)

module.exports = app