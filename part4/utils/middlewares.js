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
  console.log(error.name)

  if(error.name === 'CastError'){
    response.status(400).send({error: 'id used is malformed'})
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
}

module.exports = {
  requestLogger,
  handleErrors,
  notFound
}