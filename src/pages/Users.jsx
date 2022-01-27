import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../utils/history"
import '../assets/styles/users.css'


const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      await axios.get("https://library365backend.herokuapp.com/users")
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err))
    }
    getUsers()
  }, [])

  const goToEditPage = (e) => {
    history.push(`/edituser/${e.target.value}`)
    window.location.reload()
  }

  const deleteUser = (e) => {
    axios.delete(`https://library365backend.herokuapp.com/user/${e.target.value}`)
    .then(res => {
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  const goToLeanBook = (e) => {
    history.push(`/leanbook?user=${e.target.value}`)
    window.location.reload()
  }

  return (
    <div className="users">
      <div className="users-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Users</h1>
        <button><Link to="/createuser">Create user</Link></button>
      </div>
      <div className="users-tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Books</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>
                  {user.books.map(book => (
                    <ul>
                      <li key={book._id}>{book.bookName}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  <button onClick={goToEditPage} value={user._id}>Edit</button>
                  <button onClick={deleteUser} value={user._id}>Delete</button>
                  <button onClick={goToLeanBook} value={user._id}>Lean Book</button>
                </td>
              </tr>))
            }
            
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Users