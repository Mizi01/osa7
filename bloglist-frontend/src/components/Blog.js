import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!visible)
    return (
      <div style={blogStyle} id="short">
        <div>
          {blog.title} {blog.author}
        </div>
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes}{' '}
        <button id="like-button" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      {user !== null && blog.user.id === user.id ? (
        <button id="delete-button" onClick={() => handleDelete(blog)}>
          delete
        </button>
      ) : (
        <></>
      )}
      <button onClick={toggleVisibility}>hide</button>
    </div>
  )
}

export default Blog
