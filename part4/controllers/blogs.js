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
  const userId = request.userId
  console.log(userId)

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
  const blogId = request.params.id
  const userId = request.userId

  const blog = await Blog.findById(blogId)
  if(!blog){
    return response.status(404).json({error: 'Blog not found'})
  }

  if (blog.user.toString() !== userId){
    return response.status(403).json({error: 'only the creator can delete this blog'})
  }

  try{
    await Blog.findByIdAndDelete(blogId)
    const user = await User.findById(userId)
    user.blogs = user.blogs.filter(b => b.toString !== blogId)
    await user.save()
    response.status(204).end()
  }catch (error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const userId = request.userId
  const blog = request.body

  if(!blog){
    response.status(404).json({error: 'Blog not found'})
  }

  if (userId !== blog.user.toString()){
    response.status(403).json({error: 'only the creator can update this blog'})
  }

  const newBlogInfo = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
  }

  try{
    const result = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
    response.status(200).json(result)
  }catch(error){
    next(error)
  }
})

module.exports = blogsRouter