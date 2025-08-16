const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = request.body

  const authorization = request.get('authorization')
  let token = ''

  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    token = authorization.substring(7)
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }catch(error){
    return response.status(401).json({error: 'token is missing or invalid'})
  }
  
  if(!token || !decodedToken.id){
    return response.status(401).json({error: 'token is missing or invalid'})
  }

  const { id: userId } = decodedToken 

  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const newBlog = new Blog({
    title: blog.title,
    author: user.username,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })

  try{
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log(user.blogs)
    await user.save()

    response.json(savedBlog)
  }catch (error){
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    const result = await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }catch (error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const {id} = request.params
  const blog = request.body

  const newBlogInfo = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
  }

  try{
    const result = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
    response.status(200).json(result).end()
  }catch(error){
    next(error)
  }
})

module.exports = blogsRouter