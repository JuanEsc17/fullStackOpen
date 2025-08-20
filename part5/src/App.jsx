import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  
  const [messageStyle, setMessageStyle] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = (blogObject) => {
    try{
        blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
        setMessageStyle('message')
        setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      }catch(e){
        console.log(e)
        setMessageStyle('error')
        setMessage('unexpected error')
      }
    setTimeout(() => {
        setMessageStyle(null)
        setMessage(null)
      }, 5000)
  }

  const logIn = (user) =>{
    try{
      window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(user)
        )
      blogService.setToken(user.token)
      setUser(user)
    }catch(e){
      console.log(e)
      setMessageStyle('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setMessageStyle(null)
    }, 5000)}
  }

  const updateBlog = (updatedBlog) => {
    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(returnedBlogs => {
          setBlogs(returnedBlogs)
        })
  }

  return (
    <div>
      <h2>blogs</h2>
      {
        !user
        ? <Togglable buttonLabelShow='show login' buttonLabelHide='cancel'>
            <LoginForm 
              logIn={logIn}
            />
          </Togglable>
        :<div>
          <p>
            {user.username} logged in 
            <button onClick={handleLogOut}>logout</button>
          </p>
          <Togglable buttonLabelShow="new blog" buttonLabelHide='cancel'>
            <BlogForm addBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      }
      <Message message={message} messageStyle={messageStyle}/>
    </div>
  )
}

export default App