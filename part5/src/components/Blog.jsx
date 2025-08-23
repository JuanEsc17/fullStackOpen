import Togglable from "./Togglable"
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
  <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabelShow='view' buttonLabelHide='hide'> 
      <p>
        {blog.url}
      </p>
      <p>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </p>
      <p>
        {blog.author}
      </p>
      {
        user.username === blog.user.username
        ? <button onClick={handleDelete}>remove</button>
        : <></>
      }
    </Togglable>
  </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog