const {Schema, model} = require('mongoose')

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = model('Blog', blogSchema)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

module.exports = Blog