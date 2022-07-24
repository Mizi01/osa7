import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  console.log(users)
  const id = useParams().id
  const user = users.find(n => n.id === id)
  const userBlogs = user ? user.blogs : []
  console.log(user)
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {userBlogs.map(blog => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default User
