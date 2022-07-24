const UsersForm = ({ users }) => {
  console.log(users)
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h2>Users</h2>
            </td>
            <td>
              <h3>blogs created</h3>
            </td>
          </tr>
          {users.map(user => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>
                <center>{user.blogs.length}</center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersForm
