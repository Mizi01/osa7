import { useParams, Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const id = useParams().id
  const blogToFind = blog.find(n => n.id === id)

  console.log(blogToFind)

  return (
    <div>
      <div>
        <h2>
          {blogToFind.title} by: {blogToFind.author}
        </h2>
      </div>
      <div>
        {blogToFind.url ? (
          <Link to={blogToFind.url}>{blogToFind.url}</Link>
        ) : (
          <></>
        )}
      </div>
      <div>
        {blogToFind.likes}{' '}
        <button id="like-button" onClick={() => handleLike(blogToFind)}>
          like
        </button>
      </div>
      {user !== null && blogToFind.user.id === user.id ? (
        <button id="delete-button" onClick={() => handleDelete(blogToFind)}>
          delete
        </button>
      ) : (
        <></>
      )}
      <div>added by {blogToFind.user.name}</div>
    </div>
  )
}

export default Blog
