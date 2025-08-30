import Togglable from "./Togglable"
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user}) => {
   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog.user)

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try{
      await updateBlog(updatedBlog)
    }catch(e){
      console.error('Error al dar like: ', e)
    }
  }

  const handleDelete = async () => {
    try{
      await deleteBlog(blog, blog.user.username)
    }catch(e){
      console.log('error al eliminar')
    }
  }

  return (
  <div style={blogStyle} className='blog'>
    <div className='blog-title'>
      {blog.title}  
    </div>
    <p className="blog-author">
        {blog.author}
    </p>
    <Togglable buttonLabelShow='view' buttonLabelHide='hide'>
      <div className="blog-details">
        <p className="blog-url">
          {blog.url}
        </p>
        <p className="blog-likes">
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        {
          user.username === blog.author
          ? <button onClick={handleDelete}>remove</button>
          : <></>
        }
      </div>
    </Togglable>
  </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object
}

export default Blog