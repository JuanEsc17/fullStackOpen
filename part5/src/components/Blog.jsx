import Togglable from "./Togglable"

const Blog = ({ blog, updateBlog }) => {
   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(updatedBlog)
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
    </Togglable>
  </div>  
  )
}

export default Blog