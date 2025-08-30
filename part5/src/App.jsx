import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const messageRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
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
        messageRef.current.showMessage('message',
           `a new blog ${blogObject.title} by ${blogObject.author} added`)
      }catch(e){
        console.log(e)
        messageRef.current.showMessage('error',
          'unexpected error')
      }
  }

  const deleteBlog = (blogToDelete, username) => {
    if (username === user.username){
      if(window.confirm(`remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
        try{
          blogService
          .deleteBlog(blogToDelete.id)
          .then(deletedBlog => setBlogs(blogs.filter(blog => blog.id === deletedBlog.id)))
        }catch(e){
          console.log(e)
          messageRef.current.showMessage('error', e)
        }
      }
      
    }
  }

  const logIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.error('Error en login:', error)
      messageRef.current.showMessage(
        'error',
        'wrong username or password'
      )
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
      setBlogs(blogs.map(blog => 
        blog.id === updatedBlog.id ? updatedBlog : blog
      ))
    } catch (error) {
      console.error('Error updating blog:', error)
      messageRef.current.showMessage('Error updating blog', 'error')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {
        !user
        ? 
          <LoginForm 
            logIn={logIn}
          />
        :<div>
          <p>
            {user.username} logged in 
            <button onClick={handleLogOut}>logout</button>
          </p>
          <BlogForm addBlog={addBlog}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
          )}
        </div>
      }
      <Message ref={messageRef}/>
    </div>
  )
}

export default App