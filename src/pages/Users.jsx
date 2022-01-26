import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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

  console.log(users)

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
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td></td>
              </tr>))
            }
            
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Users