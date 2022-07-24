/* eslint-disable indent */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import UsersForm from './components/UsersForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    updatePage()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}`)
      setMessageClass('add')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
    }
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      updatePage()
      setMessage(`Added blog  ${returnedBlog.title} by ${returnedBlog.author}`)
      setMessageClass('add')
      setTimeout(() => {
        setMessage(null)
        setMessageClass('')
      }, 5000)
    })
  }

  const handleLike = blog => {
    blogService.like(blog).then(updatePage())
  }

  const handleDelete = blog => {
    window.confirm(`do you want to delete ${blog.title}?`)
      ? blogService.remove(blog).then(() => {
          updatePage()
          setMessageClass('error')
          setMessage(`deleted blog ${blog.title}`)
          setTimeout(() => {
            setMessage(null)
            setMessageClass('')
          }, 5000)
        })
      : updatePage()
  }

  const updatePage = () => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((eka, toka) => (eka.likes > toka.likes ? -1 : 1)))
      )
    usersService.getAll().then(users => {
      setUsers(users)
    })
    console.log(users)
    console.log(blogs)
  }

  const logOutForm = () => (
    <form onSubmit={logOut}>
      <button type="submit">logout</button>
    </form>
  )

  const logOut = () => {
    console.log('joo')
    window.localStorage.clear()
    setUser(null)
  }

  const blogFormRef = useRef()

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification message={message} messageClass={messageClass} />
        {user === null ? (
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            {logOutForm()}
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={blogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
          />
          <Route path="/users" element={<UsersForm users={users} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
