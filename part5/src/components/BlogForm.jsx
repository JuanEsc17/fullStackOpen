import { useState } from "react"

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
    }

    return (
      <div>
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
      </div>
    )
  }

  export default BlogForm