const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const notFound = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.substring(7)
  }else{
    request.token = null
  }
  next()
}

const handleErrors = (error, request, response, next) => {
  if(error.name === 'CastError'){
    response.status(400).send({error: 'id used is malformed'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error: 'token is invalid'})
  }else{
    return response.status(500).end()
  }
}

const userExtractor = (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token is missing or invalid' })
    }
    request.userId = decodedToken.id
    next()
  } catch (error) {
    next()
  }
}

module.exports = {
  requestLogger,
  handleErrors,
  notFound,
  tokenExtractor,
  userExtractor
}