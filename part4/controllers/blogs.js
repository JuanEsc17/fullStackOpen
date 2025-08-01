const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  /*blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))*/
  try{
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }catch (error){
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    const response = await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }catch (error){
    next(error)
  }
})

module.exports = blogsRouter