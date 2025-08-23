import { useState, useRef } from "react"
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const togglableRef = useRef()

    const handleCreate = (event) => {
      event.preventDefault()
      const blogObject = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }
      setTitle('')
      setAuthor('')
      setUrl('')
      addBlog(blogObject)
      togglableRef.current.toggleVisibility()
    }

    return (
      <div>
        <Togglable ref={togglableRef} buttonLabelShow='create new blog' buttonLabelHide='cancel'>
        <h2>create new blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            <input
              type='text'
              value={title}
              name='title'
              placeholder='title'
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            <input
              type='text'
              value={author}
              name='author'
              placeholder='author'
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            <input
              type='text'
              value={url}
              name='url'
              placeholder='URL'
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button>
            create
          </button>
        </form>
        </Togglable>
      </div>
    )
  }

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

  export default BlogForm