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

module.exports = {
  requestLogger,
  handleErrors,
  notFound
}